# 💰 Personal Expense Tracker API

A RESTful API built with Python and Flask for tracking and managing personal expenses with advanced filtering and analytics capabilities.

![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)
![Flask](https://img.shields.io/badge/Flask-3.0.0-green.svg)
![SQLite](https://img.shields.io/badge/SQLite-3-lightgrey.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

## 🚀 Features

- ✅ **Full CRUD Operations** - Create, Read, Update, and Delete expenses
- 📊 **Category Filtering** - Filter expenses by category (Food, Transport, Bills, etc.)
- 💵 **Total Spending Calculator** - Get overall spending totals
- 📈 **Spending Summary** - Analyze spending by category with totals and counts
- 🗄️ **SQLite Database** - Persistent data storage
- 🛡️ **Error Handling** - Proper HTTP status codes and error messages
- 🎯 **RESTful Design** - Clean and intuitive API endpoints

## 🛠️ Tech Stack

- **Backend Framework:** Python 3.8+, Flask
- **Database:** SQLite3
- **API Design:** RESTful Architecture
- **Testing:** Postman

## 📦 Installation & Setup

### Prerequisites
```bash
- Python 3.8 or higher
- pip (Python package manager)
```

### Quick Start

1. **Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/expense-tracker-api.git
cd expense-tracker-api
```

2. **Install dependencies**
```bash
pip install flask
```

3. **Run the application**
```bash
python app.py
```

4. **Access the API**
```
http://127.0.0.1:5000
```

The server will start on port 5000 and automatically create the SQLite database.

## 📚 API Documentation

### Base URL
```
http://127.0.0.1:5000
```

### Endpoints Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Welcome message & API information |
| POST | `/expenses` | Create a new expense |
| GET | `/expenses` | Retrieve all expenses |
| GET | `/expenses/:id` | Get a specific expense by ID |
| PUT | `/expenses/:id` | Update an expense |
| DELETE | `/expenses/:id` | Delete an expense |
| GET | `/expenses/category/:category` | Get expenses filtered by category |
| GET | `/expenses/total` | Get total spending amount |
| GET | `/expenses/summary` | Get spending breakdown by category |

### Request & Response Examples

#### Create Expense
```http
POST /expenses
Content-Type: application/json

{
    "amount": 500,
    "category": "Food",
    "description": "Grocery shopping",
    "date": "2026-02-05"
}
```

**Response:**
```json
{
    "message": "Expense added successfully",
    "id": 1
}
```

#### Get All Expenses
```http
GET /expenses
```

**Response:**
```json
{
    "count": 3,
    "expenses": [
        {
            "id": 1,
            "amount": 500,
            "category": "Food",
            "description": "Grocery shopping",
            "date": "2026-02-05"
        }
    ]
}
```

#### Get Spending Summary
```http
GET /expenses/summary
```

**Response:**
```json
{
    "total_spending": 2500,
    "by_category": [
        {
            "category": "Bills",
            "total": 1500,
            "count": 1
        },
        {
            "category": "Food",
            "total": 800,
            "count": 2
        }
    ]
}
```

## 📁 Project Structure
```
expense-tracker-api/
├── app.py              # Flask application with API routes
├── database.py         # Database operations and SQL queries
├── expenses.db         # SQLite database (auto-generated)
├── README.md           # Project documentation
├── .gitignore          # Git ignore rules
└── requirements.txt    # Python dependencies (optional)
```

## 🔧 Database Schema

**Expenses Table:**
```sql
CREATE TABLE expenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    amount REAL NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    date TEXT NOT NULL
);
```

## 🧪 Testing with Postman

1. Import the API into Postman
2. Set base URL: `http://127.0.0.1:5000`
3. Test each endpoint with sample data
4. Verify responses and status codes

Example test collection available on request.

## 🎯 Future Enhancements

- [ ] User authentication and authorization (JWT)
- [ ] Date range filtering for custom reports
- [ ] Monthly/Yearly expense reports
- [ ] Budget limits and alerts
- [ ] Export data to CSV/Excel
- [ ] Multi-currency support
- [ ] Receipt image uploads
- [ ] Recurring expenses tracking

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📝 License

This project is [MIT](LICENSE) licensed.

## 👨‍💻 Author

**YOUR_NAME**
- GitHub: [@Harsh-Sharma1111](https://github.com/Harsh-Sharma1111)
- LinkedIn: [Harsh Sharma](https://www.linkedin.com/in/harsh-sharma-ab1428375/)

## ⭐ Show Your Support

Give a ⭐️ if you found this project helpful!

---

**Built with ❤️ using Python and Flask**
```

