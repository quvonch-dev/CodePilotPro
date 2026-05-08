const titleInput = document.querySelector('#titleInput');
const amountInput = document.querySelector('#amountInput');
const typeSelect = document.querySelector('#typeSelect');
const addTransactionBtn = document.querySelector('#addTransactionBtn');
const transactionList = document.querySelector('#transactionList');
const incomeTotal = document.querySelector('#incomeTotal');
const expenseTotal = document.querySelector('#expenseTotal');
const balanceTotal = document.querySelector('#balanceTotal');
let transactions = JSON.parse(localStorage.getItem('codepilot-transactions')) || [];

function money(value) {
  return `$${value.toFixed(2)}`;
}

function saveTransactions() {
  localStorage.setItem('codepilot-transactions', JSON.stringify(transactions));
}

function renderTransactions() {
  transactionList.innerHTML = '';

  const income = transactions
    .filter((item) => item.type === 'income')
    .reduce((sum, item) => sum + item.amount, 0);

  const expense = transactions
    .filter((item) => item.type === 'expense')
    .reduce((sum, item) => sum + item.amount, 0);

  incomeTotal.textContent = money(income);
  expenseTotal.textContent = money(expense);
  balanceTotal.textContent = money(income - expense);

  if (transactions.length === 0) {
    transactionList.innerHTML = '<li><span>Hali ma’lumot yo‘q.</span></li>';
    return;
  }

  transactions.forEach((item, index) => {
    const li = document.createElement('li');
    const sign = item.type === 'income' ? '+' : '-';
    li.innerHTML = `
      <span>${item.title} <b>${sign}${money(item.amount)}</b></span>
      <button class="small-btn" data-index="${index}">O‘chirish</button>
    `;
    transactionList.appendChild(li);
  });
}

addTransactionBtn.addEventListener('click', () => {
  const title = titleInput.value.trim();
  const amount = Number(amountInput.value);
  const type = typeSelect.value;

  if (!title || amount <= 0) {
    alert('Nomi va summani to‘g‘ri kiriting!');
    return;
  }

  transactions.push({ title, amount, type });
  titleInput.value = '';
  amountInput.value = '';
  saveTransactions();
  renderTransactions();
});

transactionList.addEventListener('click', (event) => {
  const button = event.target.closest('button');
  if (!button) return;
  transactions.splice(Number(button.dataset.index), 1);
  saveTransactions();
  renderTransactions();
});

renderTransactions();
