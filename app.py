from flask import Flask, jsonify, request #imports the flask framework
import database #imports database module

app = Flask(__name__) #creates flask application

database.init_db()

@app.route('/') #defines URL path
def home():
    return jsonify({
        'message': 'Welcome to Expense Tracker API!',
        'avialable_routes': [
            'POST /expenses - Add new expense',
            'GET /expenses - Get all expenses',
        ]
    })
@app.route('/expenses', methods=['POST'])
def create_expense():
    data = request.get_json()

    amount = data.get('amount')
    category = data.get('category')
    description = data.get('description', '')
    date = data.get('date')

    if not amount or not category or not date:
        return jsonify({
            'error': 'Missing required fields: amount, category,date'
        }), 400
    
    expense_id = database.add_expense(amount, category, description, date)

    return jsonify({
        'message': 'Expense added succesfully',
        'id': expense_id
    }), 201

@app.route('/expenses', methods=['GET'])
def get_expenses():
    expenses = database.get_all_expenses()
    return jsonify({
        'count': len(expenses),
        'expenses': expenses
    }), 200

@app.route('/expenses/<int:expense_id>', methods=['GET'])
def get_expense(expense_id):
    try:
        expense = database.get_expense_by_id(expense_id)
        if expense:
            return jsonify(expense), 200
        else:
            return jsonify({'error': 'Expense not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/expenses/<int:expense_id>', methods=['DELETE'])
def delete_expense(expense_id):
    try:
        success = database.delete_expense(expense_id)
        if success:
            return jsonify({'message': 'Expense deleted successfully'}), 200
        else:
            return jsonify({'error': 'Expense not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/expenses/<int:expense_id>', methods=['PUT'])
def update_expense(expense_id):
    try:
        data = request.get_json()
        if not data.get('amount') or not data.get('category') or not data.get('date'):
            return jsonify({'error': 'Missing required fields: amount, category, date'}), 400
        success = database.update_expense(
            expense_id = expense_id,
            amount = data['amount'],
            category = data['category'],
            description = data.get('description', ''),
            date = data['date']
        )
        if success:
            return jsonify({'message': 'Expense updated successfully'}), 200
        else:
            return jsonify({'error': 'Expense not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/expenses/category/total', methods=['GET'])
def get_total():
    try:
        total = database.get_total_spending()
        return jsonify({
            'total_spending': total
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/expenses/category/<category>',methods=['GET'])
def get_by_category(category):
    try:
        expenses = database.get_expenses_by_category(category)
        return jsonify({
            'category': category,
            'count': len(expenses),
            'expenses': expenses
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/expenses/summary', methods=['GET'])
def get_summary():
    try:
        summary = database.get_total_by_category()
        total = database.get_total_spending()
        return jsonify({
            'total_spending': total,
            'by_category': summary
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
if __name__ == '__main__':
    app.run(debug=True, port=5000) # starts the server
