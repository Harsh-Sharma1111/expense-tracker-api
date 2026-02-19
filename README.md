# 💰 SpendWise Pro | Premium Expense Tracker

SpendWise Pro is a high-performance, full-stack personal finance management application. It combines a robust **Python (Flask)** REST API with a stunning, modern **Glassmorphic Frontend** to provide an elite expense tracking experience.

![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)
![Flask](https://img.shields.io/badge/Flask-3.0.0-green.svg)
![SQLite](https://img.shields.io/badge/SQLite-3-lightgrey.svg)
![Frontend](https://img.shields.io/badge/Frontend-HTML/CSS/JS-orange.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

## ✨ Features

### 🎨 Stunning Visuals
- **Elite Glassmorphism UI**: A premium dark-themed interface with translucent cards and vibrant gradients.
- **Interactive Dashboards**: Real-time stats for Total Spending, Top Categories, and Entry Counts.
- **Micro-animations**: Smooth transitions and hover effects using CSS3 and Lucide Icons.

### 📊 Powerful Analytics
- **Category Breakdown**: Dynamic doughnut charts visualizing expenditure distribution.
- **Spending Trends**: Bar charts summarizing daily expenditure for visual tracking.
- **Live Search & Filter**: Instant filtering by category or description as you type.

### 🛠️ Core Functionality
- **Full CRUD Support**: Effortlessly add, view, edit, and delete expenses through sleek modal dialogs.
- **Auto-Calculations**: Instant updates to all stats and charts upon data modification.
- **Persistent Storage**: Robust SQLite backend for reliable data retention.
- **Indian Rupee (₹) Support**: Tailored for the Indian financial ecosystem.

## 🛠️ Tech Stack

- **Backend:** Python (Flask), SQLite, Flask-CORS
- **Frontend:** Vanilla HTML5, Modern CSS3 (Glassmorphism), Vanilla JavaScript (ES6+)
- **Charts:** Chart.js
- **Icons:** Lucide Icons
- **Deployment:** Render / Heroku (via gunicorn & requirements.txt)

## 🚀 Installation & Setup

### Prerequisites
- Python 3.8 or higher
- Browser (Chrome/Firefox/Edge)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/Harsh-Sharma1111/expense-tracker-api.git
   cd expense-tracker-api
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the application**
   ```bash
   python app.py
   ```

4. **Access the Website**
   Open your browser and navigate to:
   ```
   http://127.0.0.1:5000
   ```

## 📁 Project Structure
```
expense-tracker/
├── app.py              # Flask server & Static file serving
├── database.py         # Database logic & SQL queries
├── expenses.db         # SQLite database
├── Procfile            # Deployment config
├── requirements.txt    # Python dependencies
└── frontend/           # Stunning UI folder
    ├── index.html      # Main dashboard structure
    ├── style.css       # Premium glassmorphic styles
    └── app.js          # API integration & Chart logic
```

## 📚 API Endpoints (For Developers)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Serves the Frontend |
| GET | `/api-info` | Welcome message & API info |
| POST | `/expenses` | Create a new expense |
| GET | `/expenses` | Retrieve all expenses |
| GET | `/expenses/:id` | Get specific expense |
| PUT | `/expenses/:id` | Update an expense |
| DELETE | `/expenses/:id` | Delete an expense |
| GET | `/expenses/summary` | Get spending breakdown (Charts data) |

## ☁️ Deployment

This project is configured for easy deployment on **Render** or **Heroku**:

1. Create a New Web Service.
2. Select the repository.
3. **Build Command**: `pip install -r requirements.txt`
4. **Start Command**: `gunicorn app:app`

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Harsh-Sharma1111/expense-tracker-api/issues).

## ⭐ Show Your Support
Give a ⭐️ if you found this project helpful!

---
**Built with ❤️ using Python, Flask, and Modern Web Design.**
