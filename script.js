let todos = [];
let filteredTodos = [];

// Tambah Todo
function addTodo() {
  const todoInput = document.getElementById("todo-input");
  const todoDate = document.getElementById("todo-date");

  if (validateInput(todoInput.value, todoDate.value)) {
    const formTodo = { task: todoInput.value, date: todoDate.value, completed: false };
    todos.push(formTodo);

    displayTodos(todos);

    todoInput.value = "";
    todoDate.value = "";
  }
}

// Tampilkan Todos ke UL dan Table
function displayTodos(list) {
  const todoList = document.getElementById("todo-list");
  const todoTable = document.getElementById("todo-table");

  todoList.innerHTML = "";
  todoTable.innerHTML = "";

  list.forEach((todo, index) => {
    // UL list (opsional)
    todoList.innerHTML += `
      <li class="border border-gray-300 rounded p-2 bg-white ${todo.completed ? "line-through text-green-600" : ""}">
        ${todo.task} - 
        <span class="text-sm text-gray-500">${todo.date}</span>
      </li>
    `;

    // Table row dengan semua kolom
    todoTable.innerHTML += `
      <tr class="${todo.completed ? "bg-green-100" : ""}">
        <td class="border border-gray-300 px-4 py-2 ${todo.completed ? "line-through text-gray-500" : ""}">
          ${todo.task}
        </td>
        <td class="border border-gray-300 px-4 py-2">${todo.date}</td>
        <td class="border border-gray-300 px-4 py-2 text-center">
          ${todo.completed 
            ? '<span class="text-green-600 font-semibold">Completed</span>' 
            : '<span class="text-yellow-600 font-semibold">Pending</span>'}
        </td>
        <td class="border border-gray-300 px-4 py-2 text-center space-x-2">
          <button onclick="completeTask(${index})" 
            class="px-3 py-1 rounded ${todo.completed ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"} text-white">
            Complete
          </button>
          <button onclick="deleteTask(${index})" 
            class="px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-white">
            Delete
          </button>
        </td>
      </tr>
    `;
  });
}

// Tandai Task Selesai
function completeTask(index) {
  if (!todos[index].completed) {
    todos[index].completed = true;
    displayTodos(todos);
  }
}

// Hapus Task Satuan
function deleteTask(index) {
  if (confirm("Are you sure you want to delete this task?")) {
    todos.splice(index, 1);
    displayTodos(todos);
  }
}

// Hapus Semua Todo
function deleteAll() {
  if (confirm("Are you sure you want to delete all todos?")) {
    todos = [];
    displayTodos(todos);
  }
}

// Filter Todos
function filterTodo() {
  const filterInput = document.getElementById("filter-input").value.toLowerCase();
  filteredTodos = todos.filter(todo => todo.task.toLowerCase().includes(filterInput));
  displayTodos(filteredTodos);
}

// Validasi
function validateInput(todo, date) {
  if (todo === "" || date === "") {
    alert("Please fill in both fields.");
    return false;
  }
  return true;
}
