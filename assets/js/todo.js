const todoInput = document.querySelector('#todoInput');
const addTodoBtn = document.querySelector('#addTodoBtn');
const todoList = document.querySelector('#todoList');
let todos = JSON.parse(localStorage.getItem('codepilot-todos')) || [];

function saveTodos() {
  localStorage.setItem('codepilot-todos', JSON.stringify(todos));
}

function renderTodos() {
  todoList.innerHTML = '';

  if (todos.length === 0) {
    todoList.innerHTML = '<li><span>Hali vazifa yo‘q. Birinchi vazifani qo‘shing.</span></li>';
    return;
  }

  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    if (todo.done) li.classList.add('done');

    li.innerHTML = `
      <span>${todo.text}</span>
      <div>
        <button class="small-btn" style="background:#22c55e" data-action="toggle" data-index="${index}">✓</button>
        <button class="small-btn" data-action="delete" data-index="${index}">O‘chirish</button>
      </div>
    `;

    todoList.appendChild(li);
  });
}

function addTodo() {
  const text = todoInput.value.trim();
  if (!text) {
    alert('Avval vazifa yozing!');
    return;
  }

  todos.push({ text, done: false });
  todoInput.value = '';
  saveTodos();
  renderTodos();
}

addTodoBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') addTodo();
});

todoList.addEventListener('click', (event) => {
  const button = event.target.closest('button');
  if (!button) return;

  const index = Number(button.dataset.index);
  const action = button.dataset.action;

  if (action === 'toggle') todos[index].done = !todos[index].done;
  if (action === 'delete') todos.splice(index, 1);

  saveTodos();
  renderTodos();
});

renderTodos();
