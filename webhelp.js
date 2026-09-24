let tasks = [];
let editIndex = -1;

function updateCount() {
  let count = document.querySelector("#box").children.length;
  document.querySelector("#count").innerHTML = "Tasks: " + count;
}

function createTask(value, completed = false, index) {
  let task = document.createElement("div");
  let text = document.createElement("span");
  let completeBtn = document.createElement("button");
  let editBtn = document.createElement("button");
  let deleteBtn = document.createElement("button");

  text.innerHTML = value;
  completeBtn.innerHTML = "Complete";
  editBtn.innerHTML = "Edit";
  deleteBtn.innerHTML = "Delete";

  if (completed) {
    text.style.textDecoration = "line-through";
  }

  completeBtn.addEventListener("click", function() {
    completed = !completed;

    if (completed) {
      text.style.textDecoration = "line-through";
    } else {
      text.style.textDecoration = "none";
    }

    let taskData = tasks.find(function(item) {
      return item.text === value;
    });

    taskData.completed = completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  });

  editBtn.addEventListener("click", function() {
    input.value = tasks[index].text;
    editIndex = index;
  });

  deleteBtn.addEventListener("click", function() {
    task.remove();

    tasks = tasks.filter(function(item) {
      return item.text !== value;
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
    updateCount();
  });

  task.appendChild(text);
  task.appendChild(completeBtn);
  task.appendChild(editBtn);
  task.appendChild(deleteBtn);
  document.querySelector("#box").appendChild(task);
}

let input = document.querySelector("#taskInput");
let button = document.querySelector("#addBtn");

button.addEventListener("click", function() {
  if (input.value !== "") {
    if (editIndex !== -1) {
      tasks[editIndex].text = input.value;
      localStorage.setItem("tasks", JSON.stringify(tasks));

      document.querySelector("#box").innerHTML = "";

      tasks.forEach(function(item, index) {
        createTask(item.text, item.completed, index);
      });

      editIndex = -1;
      input.value = "";
      updateCount();
      return;
    }

    let taskData = {text: input.value, completed: false};
    tasks.push(taskData);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    createTask(taskData.text, taskData.completed, tasks.length - 1);
    input.value = "";
    updateCount();
  }
});

let clearBtn = document.querySelector("#clearBtn");

clearBtn.addEventListener("click", function() {
  document.querySelector("#box").innerHTML = "";
  tasks = [];
  localStorage.removeItem("tasks");
  updateCount();
});

let searchInput = document.querySelector("#searchInput");

searchInput.addEventListener("input", function() {
  let searchText = searchInput.value.toLowerCase();
  document.querySelector("#box").innerHTML = "";

  tasks.forEach(function(item, index) {
    if (item.text.toLowerCase().includes(searchText)) {
      createTask(item.text, item.completed, index);
    }
  });

  updateCount();
});

let allBtn = document.querySelector("#allBtn");

allBtn.addEventListener("click", function() {
  document.querySelector("#box").innerHTML = "";

  tasks.forEach(function(item, index) {
    createTask(item.text, item.completed, index);
  });

  updateCount();
});

let pendingBtn = document.querySelector("#pendingBtn");

pendingBtn.addEventListener("click", function() {
  document.querySelector("#box").innerHTML = "";

  tasks.forEach(function(item, index) {
    if (!item.completed) {
      createTask(item.text, item.completed, index);
    }
  });

  updateCount();
});

let completedBtn = document.querySelector("#completedBtn");

completedBtn.addEventListener("click", function() {
  document.querySelector("#box").innerHTML = "";

  tasks.forEach(function(item, index) {
    if (item.completed) {
      createTask(item.text, item.completed, index);
    }
  });

  updateCount();
});

let savedTasks = localStorage.getItem("tasks");

if (savedTasks) {
  tasks = JSON.parse(savedTasks);

  tasks.forEach(function(item, index) {
    createTask(item.text, item.completed, index);
  });

  updateCount();
}
