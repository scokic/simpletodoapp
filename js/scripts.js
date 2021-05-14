"use strict";

// MENU OPEN

const hamburger = document.querySelector(".hamburger-container");
const nav = document.getElementById("nav-bar");

function openNav() {
  nav.classList.toggle("open-menu");
}

let tasks = [
  { id: 1, name: "Prvi zadatak", status: "checked" },
  { id: 2, name: "Drugi zadatak", status: "" },
  { id: 1, name: "Prvi zadatak", status: "checked" },
  { id: 2, name: "Drugi zadatak", status: "" },
  { id: 1, name: "Prvi zadatak", status: "checked" },
  { id: 2, name: "Drugi zadatak", status: "" },
  { id: 1, name: "Prvi zadatak", status: "checked" },
  { id: 2, name: "Drugi zadatak", status: "" },
  { id: 1, name: "Prvi zadatak", status: "checked" },
  { id: 2, name: "Drugi zadatak", status: "" },
  { id: 1, name: "Prvi zadatak", status: "checked" },
  { id: 2, name: "Drugi zadatak", status: "" },
  { id: 1, name: "Prvi zadatak", status: "checked" },
  { id: 2, name: "Drugi zadatak", status: "" },
];

// TASK FUNCTIONS ------------------------------------------------------------------------------------------------

const taskList = document.querySelector(".tasks-container");
const newTaskFormInput = document.querySelector(".new-task-input");
const newTaskBtn = document.querySelector(".new-task-button");
const newTaskContainer = document.querySelector(".new-task-container");
const cancelNewTask = document.querySelector(".cancel-new-task");
let editTaskInputs = document.querySelectorAll(".edit-task-input");

// READ EXISTING TASKS

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
        <p class="task-name" onclick="editTask(this)">${task.name}</p>
        <button class="edit-task-button" onclick="editTask(this)">
          <i class="fas fa-pen"></i>
        </button>
        <button class="delete-task-button" onclick="deleteTask(this)">
          <i class="fas fa-trash"></i>
        </button>
      </div>
      <form class="task-edit-container">
        <input class="edit-task-input" type="text" placeholder="Enter task name" onkeydown="changeCancelOnKeydown(this)" />
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

newTaskBtn.addEventListener("click", () => {
  newTaskContainer.classList.add("new-task-form-open");
  newTaskFormInput.focus();
});

cancelNewTask.addEventListener("click", () => {
  event.preventDefault();
  newTaskContainer.classList.remove("new-task-form-open");
  newTaskFormInput.value = "";
});

newTaskContainer.addEventListener("keydown", () => {
  if (event.key === "Escape") {
    newTaskContainer.classList.remove("new-task-form-open");
    newTaskFormInput.value = "";
  }
});

function addNewTask() {
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
        <p class="task-name" onclick="editTask(this)">${newTask.name}</p>
        <button class="edit-task-button" onclick="editTask(this)">
          <i class="fas fa-pen"></i>
        </button>
        <button class="delete-task-button" onclick="deleteTask(this)">
          <i class="fas fa-trash"></i>
        </button>
      </div>
      <form class="task-edit-container">
        <input class="edit-task-input" type="text" placeholder="Enter task name" onkeydown="changeCancelOnKeydown(this)" />
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

// DELETE A TASK

function deleteTask(event) {
  let id = event.parentElement.parentElement.id;

  event.parentElement.parentElement.classList.remove("edit-open");

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
  let status;

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id == id) {
      if (tasks[i].status === "checked") {
        status = tasks[i].status = "";
      } else {
        status = tasks[i].status = "checked";
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
        submitEvent.parentElement.parentElement.children[0].children[1].textContent =
          input;

        submitEvent.parentElement.children[0].value = "";
        let task =
          submitEvent.parentElement.parentElement.classList.remove("edit-open");
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

function changeCancelOnKeydown(input) {
  if (event.key === "Escape") {
    input.value = "";
    input.parentElement.parentElement.classList.remove("edit-open");
    event.preventDefault();
  }
}

// OPEN SETTINGS MENU

const settingsButton = document.querySelector(".settings");

function openSettings() {
  settingsButton.classList.toggle("open");
}
