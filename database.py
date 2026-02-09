import sqlite3
def init_db():
    conn = sqlite3.connect('expenses.db')
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS expenses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            amount REAL NOT NULL,
            category TEXT NOT NULL,
            description TEXT,
            date TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()
    print("Database created successfully!")
init_db()

def add_expense(amount,category,description,date):
    conn = sqlite3.connect('expenses.db')
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO expenses (amount,category,description,date)
            VALUES (?,?,?,?)
    ''', (amount,category,description,date))

    conn.commit()
    expense_id = cursor.lastrowid
    conn.close()
    return expense_id

def get_all_expenses():
    conn = sqlite3.connect('expenses.db')
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM expenses ORDER BY date DESC')
    expenses = cursor.fetchall()
    conn.close()
    expenses_list = []
    for expense in expenses:
        expenses_list.append({
            'id': expense['id'],
            'amount' : expense['amount'],
            'category' : expense['category'],
            'description' : expense['description'],
            'date' : expense['date']
        })
    return expenses_list
def get_expense_by_id(expense_id):
    conn = sqlite3.connect('expenses.db')
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM expenses WHERE id = ?', (expense_id,))
    expense = cursor.fetchone()
    conn.close()
    if expense:
        return{
            'id': expense['id'],
            'amount' : expense['amount'],
            'category' : expense['category'],
            'description' : expense['description'],
            'date' : expense['date']
        }
    return None

def delete_expense(expense_id):
    conn = sqlite3.connect('expenses.db')
    cursor = conn.cursor()
    cursor.execute('DELETE FROM expenses WHERE id = ?', (expense_id,))
    conn.commit()
    rows_affected = cursor.rowcount
    conn.close()
    return rows_affected > 0

def update_expense(expense_id, amount, category, description, date):
    conn = sqlite3.connect('expenses.db')
    cursor = conn.cursor()
    cursor.execute('''
        UPDATE expenses
        SET amount = ?, category = ?, description = ?, date = ?
        WHERE id = ?
    ''', (amount, category, description, date, expense_id))
    conn.commit()
    rows_affected = cursor.rowcount
    conn.close()
    return rows_affected > 0
    
def get_expenses_by_category(category):
    conn = sqlite3.connect('expenses.db')
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM expenses WHERE category = ? ORDER BY date DESC',(category,))
    expenses = cursor.fetchall()
    conn.close()
    expenses_list = []
    for expense in expenses:
        expenses_list.append({
            'id': expense['id'],
            'amount': expense['amount'],
            'category': expense['category'],
            'description': expense['description'],
            'date': expense['date']
        })
    return expenses_list

def get_total_spending():
    conn = sqlite3.connect('expenses.db')
    cursor = conn.cursor()
    cursor.execute('SELECT SUM(amount) as total FROM expenses')
    result = cursor.fetchone()
    conn.close()
    return result[0] if result[0] else 0

def get_total_by_category():
    conn = sqlite3.connect('expenses.db')
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute('''
        SELECT category, SUM(amount) as total, COUNT(*) as count
        FROM expenses
        GROUP BY category
        ORDER BY total DESC
    ''')
    results = cursor.fetchall()
    conn.close()
    category_totals = []
    for row in results:
        category_totals.append({
            'category': row['category'],
            'total': row['total'],
            'count': row['count']
        })
    return category_totals



#if __name__ == '__main__':
#   init_db()
#    add_expense(500.50, 'Groceries', 'Weekly grocery shopping', '12-01-2026')
#    add_expense(200.00, 'Transport', 'Ola Ride', '15-01-2026')
#    add_expense(13000.55, 'Flight', 'Airline ticket for vacation', '02-02-2026')
#    
#    all_expenses = get_all_expenses()
#    for expense in all_expenses:
#        print(f"ID: {expense['id']}, Amount: {expense['amount']}, Category: {expense['category']}, Description: {expense['description']}, Date: {expense['date']}")
