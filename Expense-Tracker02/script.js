const expenseForm = document.getElementById('expense-form');
const expenseName = document.getElementById('expense-name');
const expenseAmount = document.getElementById('expense-amount');
const expensesList = document.getElementById('expenses');

let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

function renderExpenses() {
  expensesList.innerHTML = ''; 
  expenses.forEach((expense, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${expense.name} - $${expense.amount}
      <button class="delete-btn" onclick="deleteExpense(${index})">Delete</button>
    `;
    expensesList.appendChild(li);
  });
}

function addExpense(e) {
  e.preventDefault(); 
  const name = expenseName.value.trim();
  const amount = expenseAmount.value.trim();

  if (name && amount) {
    expenses.push({ name, amount });
    localStorage.setItem('expenses', JSON.stringify(expenses));
    renderExpenses();
    expenseName.value = '';
    expenseAmount.value = '';
  } else {
    alert('Please enter valid expense details!');
  }
}

function deleteExpense(index) {
  expenses.splice(index, 1); 
  localStorage.setItem('expenses', JSON.stringify(expenses)); 
  renderExpenses(); 
}

expenseForm.addEventListener('submit', addExpense);

renderExpenses();
