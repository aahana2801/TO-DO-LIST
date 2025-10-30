// ---- Select elements ----
const input = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// ---- Load tasks from localStorage ----
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
renderTasks();

// ---- Add new task ----
addBtn.addEventListener('click', addTask);
input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTask();
});

function addTask() {
  const text = input.value.trim();
  if (text === '') return;
  tasks.push({ text, completed: false });
  input.value = '';
  saveAndRender();
}

// ---- Toggle / Delete task ----
taskList.addEventListener('click', (e) => {
  if (e.target.tagName === 'SPAN') {
    const index = e.target.parentElement.dataset.index;
    tasks[index].completed = !tasks[index].completed;
    saveAndRender();
  } else if (e.target.classList.contains('delete')) {
    const index = e.target.parentElement.dataset.index;
    tasks.splice(index, 1);
    saveAndRender();
  }
});

// ---- Helper: Save to localStorage and render ----
function saveAndRender() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

// ---- Render the tasks ----
function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, i) => {
    const li = document.createElement('li');
    li.dataset.index = i;
    li.className = task.completed ? 'completed' : '';
    li.innerHTML = `
      <span>${task.text}</span>
      <button class="delete">×</button>
    `;
    taskList.appendChild(li);
  });
}
