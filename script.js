
const todoList = document.getElementById("todo-list");
const addButton = document.getElementById("add-button");
const newTodoInput = document.getElementById("new-todo");


function addTodo(text, completed = false) {
  const li = document.createElement("li");
  li.className = "todo-item";
  if (completed) {
    li.classList.add("completed");
  }
  li.innerHTML = `
    <input type="checkbox" ${completed ? "checked" : ""} />
    <label>${text}</label>
    <div class="todo-actions">
        <div class="icon edit-icon">
            <span title="Edit">✏️</span>
        </div>
        <div class="icon delete-icon">
            <span title="Delete">🗑️</span>
        </div>
    </div>
  `;
  todoList.appendChild(li);
}


function handleAddButtonClick() {
  const text = newTodoInput.value.trim();
  if (text !== "") {
    addTodo(text);
    newTodoInput.value = "";
  }
}


function toggleTodoCompleted(target) {
  const item = target.closest(".todo-item");
  if (item) {
    item.classList.toggle("completed");
  }
}

function deleteTodoItem(target) {
  const item = target.closest(".todo-item");
  if (item) {
    item.remove();
  }
}



function handleTodoListClick(e) {
  const target = e.target;

  if (target.matches('input[type="checkbox"]')) {
    toggleTodoCompleted(target);
    return;
  }

  if (target.closest(".delete-icon")) {
    deleteTodoItem(target);
    return;
  }

  if (target.closest(".edit-icon")) {
    const item = target.closest(".todo-item");
    if (!item) return;
    const label = item.querySelector("label");
    if (!label) return;
    // If already editing, do nothing
    if (item.querySelector(".edit-input")) return;

    const currentText = label.textContent;
    // Create input for editing
    const input = document.createElement("input");
    input.type = "text";
    input.value = currentText;
    input.className = "edit-input";
    label.replaceWith(input);
    input.focus();

    // Add save on Enter or blur
    function saveEdit() {
      const newText = input.value.trim() || currentText;
      const newLabel = document.createElement("label");
      newLabel.textContent = newText;
      input.replaceWith(newLabel);
    }
    input.addEventListener("keydown", function(ev) {
      if (ev.key === "Enter") {
        saveEdit();
      }
    });
    input.addEventListener("blur", saveEdit);
    return;
  }
}


addButton.addEventListener("click", handleAddButtonClick);
todoList.addEventListener("click", handleTodoListClick);

const mockTodos = [
  { text: "Buy groceries", completed: false },
  { text: "Walk the dog", completed: true },
  { text: "Test the app", completed: false },
];

mockTodos.forEach((todo) => addTodo(todo.text, todo.completed));
