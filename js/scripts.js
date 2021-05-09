"use strict";

// MENU OPEN

const hamburger = document.querySelector(".hamburger-container");
const nav = document.getElementById("nav-bar");

hamburger.addEventListener("click", () => {
  nav.classList.toggle("open-menu");
});

let tasks = [
  { id: 1, name: "Prvi zadatak", status: "checked" },
  { id: 2, name: "Drugi zadatak", status: "" },
];

// READ EXISTING TASKS

let taskList = document.querySelector(".tasks-container");

tasks.forEach((task) =>
  taskList.insertAdjacentHTML(
    "afterbegin",
    `<li class="task-container" id="${task.id}">
      <div class="task-info-container">
        <input
          type="checkbox"
          ${task.status}
          onchange="handleChange(this)" class="task-checkbox"
        />
        <p class="task-name">${task.name}</p>
        <button class="edit-task-button" onclick="editTask(this)">
          <i class="fas fa-pen"></i>
        </button>
        <button class="delete-task-button" onclick="deleteTask(this)">
          <i class="fas fa-trash"></i>
        </button>
      </div>
      <form class="task-edit-container">
        <input type="text" placeholder="Enter task name"/>
        <button class="apply-button" onclick="applyChange(this)">
        Apply
        </button>
        <button class="cancel-button" onclick="cancelChange(this)">
          Cancel
        </button>
      </form>
    </li>`
  )
);

// CREATE NEW TASK

function addNewTask() {
  let newTaskFormInput = document.querySelector(".new-task-input");

  if (newTaskFormInput.value === "") {
    alert("Please name your task");
  } else {
    const maxId = Math.max(...tasks.map((o) => o.id), 0);
    let newTask = {
      id: maxId + 1,
      name: `${newTaskFormInput.value}`,
      status: "",
    };
    tasks.push(newTask);
    taskList.insertAdjacentHTML(
      "afterbegin",
      `<li class="task-container" id="${newTask.id}">
      <div class="task-info-container">
        <input
          type="checkbox"
          ${newTask.status}
          onchange="handleChange(this)" class="task-checkbox"
        />
        <p class="task-name">${newTask.name}</p>
        <button class="edit-task-button" onclick="editTask(this)">
          <i class="fas fa-pen"></i>
        </button>
        <button class="delete-task-button" onclick="deleteTask(this)">
          <i class="fas fa-trash"></i>
        </button>
      </div>
      <form class="task-edit-container">
        <input type="text" placeholder="Enter task name"/>
        <button class="apply-button" onclick="applyChange(this)">
        Apply
        </button>
        <button class="cancel-button" onclick="cancelChange(this)">
          Cancel
        </button>
      </form>
    </li>`
    );
  }
  newTaskFormInput.value = "";
  event.preventDefault();
}

// TASK FUNCTIONS ------------------------------------------------------------------------------------------------

// DELETE A TASK
console.log(tasks);

function deleteTask(event) {
  let id = event.parentElement.id;

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id == id) {
      tasks.splice(i, 1);
      event.parentElement.remove();
    }
  }
}

// MARK TASK AS DONE

function handleChange(event) {
  let id = event.parentElement.parentElement.id;

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id == id) {
      if (tasks[i].status === "checked") {
        let status = (tasks[i].status = "");
      } else {
        let status = (tasks[i].status = "checked");
      }
    }
  }
}

// EDIT TASK NAME

function editTask(event) {
  event.parentElement.parentElement.classList.toggle("edit-open");
  event.parentElement.parentElement.children[1].children[0].focus();
}

function applyChange(submitEvent) {
  let id = submitEvent.parentElement.parentElement.id;
  let input = submitEvent.parentElement.children[0].value;

  if (input === "") {
    alert("Please name your task");
  } else {
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id == id) {
        tasks[i].name = input;
        submitEvent.parentElement.parentElement.children[0].children[1].textContent = input;

        submitEvent.parentElement.children[0].value = "";
        let task = submitEvent.parentElement.parentElement.classList.remove(
          "edit-open"
        );
      }
    }
  }
  event.preventDefault();
}

function cancelChange(cancelEvent) {
  cancelEvent.parentElement.children[0].value = "";
  cancelEvent.parentElement.parentElement.classList.remove("edit-open");
  event.preventDefault();
}
