const API_URL = window.location.origin; // Dynamically detect the backend URL

// State Management
let expenses = [];
let categoryChart = null;
let analyticsChart = null;
let currentView = 'dashboard';

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    updateDate();
    initEventListeners();
    fetchData();
});

function updateDate() {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('current-date').innerText = new Date().toLocaleDateString(undefined, options);
}

function initEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-links li').forEach(item => {
        item.addEventListener('click', () => {
            document.querySelectorAll('.nav-links li').forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            const target = item.getAttribute('data-target');
            showView(target);
        });
    });

    // Modal
    const modal = document.getElementById('expense-modal');
    document.getElementById('add-expense-btn').addEventListener('click', () => {
        document.getElementById('modal-title').innerText = 'Add Expense';
        document.getElementById('expense-form').reset();
        document.getElementById('edit-id').value = '';
        modal.classList.add('active');
    });

    document.querySelector('.close-modal').addEventListener('click', () => {
        modal.classList.remove('active');
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
    });

    // Form Submission
    document.getElementById('expense-form').addEventListener('submit', handleFormSubmit);

    // Search and Filter
    document.getElementById('search-expenses').addEventListener('input', renderExpenses);
    document.getElementById('filter-category').addEventListener('change', renderExpenses);

    // View All link
    document.querySelector('.view-all').addEventListener('click', (e) => {
        e.preventDefault();
        const target = e.target.getAttribute('data-target');
        const navItem = document.querySelector(`.nav-links li[data-target="${target}"]`);
        if (navItem) navItem.click();
    });
}

function showView(viewId) {
    if (viewId === currentView) return; // Prevent redundant initialization
    currentView = viewId;

    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById(`${viewId}-view`).classList.add('active');
    document.getElementById('page-title').innerText = viewId.charAt(0).toUpperCase() + viewId.slice(1);

    if (viewId === 'dashboard') fetchData();
    if (viewId === 'analytics') renderAnalytics();
}

async function fetchData() {
    try {
        const response = await fetch(`${API_URL}/expenses`);
        const data = await response.json();
        expenses = data.expenses || [];

        renderDashboard();
        renderExpenses();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function renderDashboard() {
    try {
        const response = await fetch(`${API_URL}/expenses/summary`);
        const summary = await response.json();

        // Update Stats
        document.getElementById('total-spending-amount').innerText = `₹${summary.total_spending.toFixed(2)}`;
        document.getElementById('total-entries-count').innerText = expenses.length;

        const categoryData = summary.by_category || [];
        const topCatObj = categoryData.length > 0 ? categoryData[0] : null;
        document.getElementById('top-category').innerText = topCatObj ? topCatObj.category : '-';

        // Prepare data for Chart
        const chartData = {};
        categoryData.forEach(item => {
            chartData[item.category] = item.total;
        });

        // Render Pie Chart
        renderCategoryChart(chartData);

        // Render Recent Expenses
        const recentList = document.getElementById('recent-expense-list');
        recentList.innerHTML = '';
        const sortedExpenses = [...expenses].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

        if (sortedExpenses.length === 0) {
            recentList.innerHTML = '<p style="text-align:center; padding: 2rem; color: var(--text-secondary);">No recent expenses</p>';
        } else {
            sortedExpenses.forEach(exp => {
                const item = document.createElement('div');
                item.className = 'expense-item-mini';
                item.innerHTML = `
                    <div class="item-info">
                        <div class="category-icon-small">
                            <i data-lucide="${getCategoryIcon(exp.category)}"></i>
                        </div>
                        <div class="item-text">
                            <h4>${exp.description || exp.category}</h4>
                            <p>${formatDate(exp.date)}</p>
                        </div>
                    </div>
                    <div class="item-amount">-₹${exp.amount.toFixed(2)}</div>
                `;
                recentList.appendChild(item);
            });
            lucide.createIcons();
        }
    } catch (error) {
        console.error('Error rendering dashboard:', error);
    }
}

function renderCategoryChart(data) {
    const ctx = document.getElementById('categoryChart').getContext('2d');

    if (categoryChart) categoryChart.destroy();

    const labels = Object.keys(data);
    const values = Object.values(data);

    categoryChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: values,
                backgroundColor: [
                    '#6366f1', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#64748b'
                ],
                borderWidth: 0,
                hoverOffset: 12
            }]
        },
        options: {
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { color: '#94a3b8', padding: 20, font: { size: 12 } }
                }
            },
            cutout: '70%',
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

function renderExpenses() {
    const tbody = document.getElementById('expense-tbody');
    const searchTerm = document.getElementById('search-expenses').value.toLowerCase();
    const filterCat = document.getElementById('filter-category').value;

    tbody.innerHTML = '';

    const filtered = expenses.filter(exp => {
        const matchesSearch = (exp.description || '').toLowerCase().includes(searchTerm) ||
            (exp.category || '').toLowerCase().includes(searchTerm);
        const matchesCat = filterCat === 'all' || exp.category === filterCat;
        return matchesSearch && matchesCat;
    });

    filtered.sort((a, b) => new Date(b.date) - new Date(a.date)).forEach(exp => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${formatDate(exp.date)}</td>
            <td><span class="badge ${exp.category.toLowerCase()}">${exp.category}</span></td>
            <td>${exp.description || '-'}</td>
            <td style="font-weight: 600;">₹${exp.amount.toFixed(2)}</td>
            <td>
                <div style="display: flex; gap: 0.5rem;">
                    <button onclick="editExpense(${exp.id})" class="btn-icon" title="Edit"><i data-lucide="edit-2"></i></button>
                    <button onclick="deleteExpense(${exp.id})" class="btn-icon btn-icon-danger" title="Delete"><i data-lucide="trash-2"></i></button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });
    lucide.createIcons();
}

async function handleFormSubmit(e) {
    e.preventDefault();

    const id = document.getElementById('edit-id').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const category = document.getElementById('category').value;
    const date = document.getElementById('date').value;
    const description = document.getElementById('description').value;

    const payload = { amount, category, date, description };

    try {
        let response;
        if (id) {
            response = await fetch(`${API_URL}/expenses/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
        } else {
            response = await fetch(`${API_URL}/expenses`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
        }

        if (response.ok) {
            document.getElementById('expense-modal').classList.remove('active');
            fetchData();
        } else {
            alert('Error saving expense');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function deleteExpense(id) {
    if (!confirm('Are you sure you want to delete this expense?')) return;

    try {
        const response = await fetch(`${API_URL}/expenses/${id}`, { method: 'DELETE' });
        if (response.ok) {
            fetchData();
        }
    } catch (error) {
        console.error('Error deleting:', error);
    }
}

function editExpense(id) {
    const exp = expenses.find(e => e.id === id);
    if (!exp) return;

    document.getElementById('modal-title').innerText = 'Edit Expense';
    document.getElementById('edit-id').value = exp.id;
    document.getElementById('amount').value = exp.amount;
    document.getElementById('category').value = exp.category;
    document.getElementById('date').value = exp.date;
    document.getElementById('description').value = exp.description;

    document.getElementById('expense-modal').classList.add('active');
}

function renderAnalytics() {
    const ctx = document.getElementById('analyticsChart').getContext('2d');

    if (analyticsChart) analyticsChart.destroy();

    // Simple bar chart of spending by day for last 7 days
    const dailyData = {};
    expenses.forEach(exp => {
        dailyData[exp.date] = (dailyData[exp.date] || 0) + exp.amount;
    });

    const labels = Object.keys(dailyData).sort();
    const values = labels.map(l => dailyData[l]);

    analyticsChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Spending (₹)',
                data: values,
                backgroundColor: 'rgba(99, 102, 241, 0.5)',
                borderColor: '#6366f1',
                borderWidth: 1,
                borderRadius: 5
            }]
        },
        options: {
            scales: {
                y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94a3b8' } },
                x: { grid: { display: false }, ticks: { color: '#94a3b8' } }
            },
            plugins: {
                legend: { display: false }
            },
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

// Helpers
function getCategoryIcon(cat) {
    const icons = {
        'Food': 'utensils',
        'Transport': 'car',
        'Entertainment': 'tv',
        'Shopping': 'shopping-bag',
        'Health': 'heart-pulse',
        'Utilities': 'zap',
        'Other': 'help-circle'
    };
    return icons[cat] || 'receipt';
}

function formatDate(dateStr) {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateStr).toLocaleDateString(undefined, options);
}
