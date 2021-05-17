"use strict";

// PWA SETUP

window.addEventListener("load", () => {
  registerSW();
});

async function registerSW() {
  if ("serviceWorker" in navigator) {
    try {
      await navigator.serviceWorker.register("sw.js");
    } catch (e) {
      console.log("SW registration failed");
    }
  }
}

// MENU OPEN

const hamburger = document.querySelector(".hamburger");
const nav = document.getElementById("nav-bar");
const settingsBtn = document.querySelector(".settings");
const addNewTaskBtn = document.querySelector(".add-new-task");
const disabledBtn = document.querySelector(".disabled-button");
const newTaskForm = document.querySelector(".new-task-form");

const taskList = document.querySelector(".tasks-container");
const newTaskFormInput = document.querySelector(".new-task-input");
const newTaskBtn = document.querySelector(".new-task-button");
const newTaskContainer = document.querySelector(".new-task-container");
const cancelNewTask = document.querySelector(".cancel-new-task");
const editTaskInputs = document.querySelectorAll(".edit-task-input");

const hideCompleteBtn = document.querySelector(".hide-completed-filter");
const showAllTasksBtn = document.querySelector(".show-all-filter");
const newTaskBtnGlobal = document.querySelector(".new-task-button-global");
const newTaskModal = document.querySelector(".new-task-modal");
const newTaskModalForm = document.querySelector(".new-task-modal-form");
const newTaskModalClose = document.querySelector(".new-task-modal-close");
const newTaskModalInput = document.querySelector(".new-task-modal-input");
const addNewTaskBtnModal = document.querySelector(".add-new-task-modal");
const cancelNewTaskModal = document.querySelector(".cancel-new-task-modal");
let tasks = [];

// APP INITIALIZATION

readTasksFromLocalStorage();
readTasks(tasks);

function toggleMobileNav() {
  nav.classList.toggle("open-menu");
}

// TOGGLE SIDEBAR

function toggleSidebar() {
  nav.classList.toggle("nav-hidden-desktop");
}

// OPEN SETTINGS MENU

function openSettings() {
  settingsBtn.classList.toggle("open");
}

// TASK FUNCTIONS ------------------------------------------------------------------------------------------------

// READ EXISTING TASKS

function readTasks(input) {
  taskList.innerHTML = "";

  input.forEach((task) =>
    taskList.insertAdjacentHTML(
      "afterbegin",
      `<li class="task-container ${task.status}" id="${task.id}">
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
        <input class="edit-task-input" type="text" placeholder="Enter todo name" onkeydown="changeCancelOnKeydown(this)" onkeypress="toggleSidebarShortcut()"/>
        <button class="apply-button disabled-button" onclick="applyChange(this)">
        Apply
        </button>
        <button class="cancel-button" onclick="cancelChange(this)">
          Cancel
        </button>
      </form>
    </li>`
    )
  );

  hideCompleteBtn.classList.remove("hidden");
  showAllTasksBtn.classList.add("hidden");
}

// CREATE NEW TASK

newTaskBtn.addEventListener("click", () => {
  event.preventDefault();
  newTaskContainer.classList.add("new-task-form-open");
  newTaskFormInput.focus();
});

cancelNewTask.addEventListener("click", () => {
  event.preventDefault();
  newTaskContainer.classList.remove("new-task-form-open");
  newTaskFormInput.value = "";
  newTaskModal.classList.add("hidden");
});

newTaskContainer.addEventListener("keydown", () => {
  if (event.key === "Escape") {
    newTaskContainer.classList.remove("new-task-form-open");
    newTaskFormInput.value = "";
  }
});

function addNewTask() {
  if (newTaskFormInput.value !== "") {
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
        <input class="edit-task-input" type="text" placeholder="Enter todo name" onkeydown="changeCancelOnKeydown(this)" onkeypress="toggleSidebarShortcut()"/>
        <button class="apply-button" onclick="applyChange(this)">
        Apply
        </button>
        <button class="cancel-button" onclick="cancelChange(this)">
          Cancel
        </button>
      </form>
    </li>`
    );
    saveTasksToLocalStorage();
  }

  newTaskModal.classList.add("hidden");
  addNewTaskBtn.classList.add("disabled-button");
  newTaskForm.removeEventListener("click", addNewTask);

  newTaskFormInput.value = "";
  event.preventDefault();
}

// CREATE NEW TASK FROM MODAL

newTaskBtnGlobal.addEventListener("click", showNewTaskModal);

function showNewTaskModal() {
  newTaskModal.classList.remove("hidden");
  newTaskModalInput.focus();
}

newTaskModalClose.addEventListener("click", hideNewTaskModal);

function hideNewTaskModal() {
  newTaskModal.classList.add("hidden");
  newTaskModalInput.value = "";
}

function closeNewTaskModal() {
  if (event.key === "Escape") {
    hideNewTaskModal();
  }
}

// THIS NEEDS TO BE CLEANED - Not following DRY

function addNewTaskModal() {
  if (newTaskModalInput.value !== "") {
    const maxId = Math.max(...tasks.map((o) => o.id), 0);
    let newTask = {
      id: maxId + 1,
      name: `${newTaskModalInput.value}`,
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
        <input class="edit-task-input" type="text" placeholder="Enter todo name" onkeydown="changeCancelOnKeydown(this)" onkeypress="toggleSidebarShortcut()"/>
        <button class="apply-button" onclick="applyChange(this)">
        Apply
        </button>
        <button class="cancel-button" onclick="cancelChange(this)">
          Cancel
        </button>
      </form>
    </li>`
    );
    saveTasksToLocalStorage();
    newTaskModal.classList.add("hidden");
    addNewTaskBtnModal.classList.add("disabled-button");
    newTaskModalForm.removeEventListener("click", addNewTaskModal);

    newTaskModalInput.value = "";
  }
  event.preventDefault();
}

// DISABLE CLICK FUNCTION IF INPUT IS EMPTY

function disableButton() {
  if (newTaskFormInput.value !== "") {
    addNewTaskBtn.classList.remove("disabled-button");
    newTaskForm.addEventListener("click", addNewTask);
  } else {
    addNewTaskBtn.classList.add("disabled-button");
    newTaskForm.removeEventListener("click", addNewTask);
  }
}

function disableModalButton() {
  if (newTaskModalInput.value !== "") {
    addNewTaskBtnModal.classList.remove("disabled-button");
    newTaskModalForm.addEventListener("click", addNewTaskModal);
  } else {
    addNewTaskBtnModal.classList.add("disabled-button");
    newTaskModalForm.removeEventListener("click", addNewTaskModal);
  }
}

taskList.addEventListener("input", function (e) {
  const taskInfo = e.target.parentElement;
  const button = taskInfo.children[1];
  if (e.target.value !== "") {
    button.classList.remove("disabled-button");
  } else {
    button.classList.add("disabled-button");
  }
});

// CLOSE TASK EDIT FORM WHEN ANOTHER TASK OPENS

taskList.addEventListener("click", function (e) {
  const editTaskButton = e.target.parentElement;
  const taskName = e.target;

  if (editTaskButton.className == "edit-task-button") {
    const taskWrapper = e.target.parentElement.parentElement.parentElement;

    if (!taskWrapper.classList.contains("edit-open")) {
    } else {
      taskList.childNodes.forEach((task) => {
        task.classList.remove("edit-open");
      });
      taskWrapper.classList.add("edit-open");
    }
  } else if (taskName.className == "task-name") {
    const taskWrapper = e.target.parentElement.parentElement;

    if (!taskWrapper.classList.contains("edit-open")) {
    } else {
      taskList.childNodes.forEach((task) => {
        task.classList.remove("edit-open");
      });
      taskWrapper.classList.add("edit-open");
    }
  }
});

cancelNewTaskModal.addEventListener("click", hideNewTaskModal);

// DELETE A TASK

function deleteTask(event) {
  let id = event.parentElement.parentElement.id;
  event.parentElement.parentElement.classList.remove("edit-open");

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id == id) {
      tasks.splice(i, 1);
      const taskWrapper = event.parentElement.parentElement;
      taskWrapper.remove();
    }
  }
  saveTasksToLocalStorage();
}

// MARK TASK AS DONE

function handleChange(event) {
  let taskId = event.parentElement.parentElement.id;
  let taskContainer = event.parentElement.parentElement;
  let status;

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id == taskId) {
      if (tasks[i].status === "checked") {
        status = tasks[i].status = "";
        taskContainer.classList.remove("checked");
      } else {
        status = tasks[i].status = "checked";
        taskContainer.classList.add("checked");
      }
    }
  }
  saveTasksToLocalStorage();
}

// EDIT TASK NAME

function editTask(event) {
  event.parentElement.parentElement.classList.toggle("edit-open");
  event.parentElement.parentElement.children[1].children[0].focus();
}

function applyChange(submitEvent) {
  let id = submitEvent.parentElement.parentElement.id;
  let input = submitEvent.parentElement.children[0];
  let button = submitEvent.parentElement.children[1];

  if (input.value !== "") {
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id == id) {
        tasks[i].name = input.value;
        submitEvent.parentElement.parentElement.children[0].children[1].textContent =
          input.value;

        submitEvent.parentElement.children[0].value = "";
        let task =
          submitEvent.parentElement.parentElement.classList.remove("edit-open");
        button.classList.add("disabled-button");
      }
    }
  }
  saveTasksToLocalStorage();
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

function toggleSidebarShortcut() {
  if (event.key === "m") {
    toggleSidebar();
  }
}

// FILTER COMPLETED TASKS

function hideCompletedTasks() {
  let i;
  let notCompletedTasks = [];

  for (i = 0; i < tasks.length; i++) {
    if (tasks[i].status === "") {
      notCompletedTasks.push(tasks[i]);
    }
  }

  taskList.innerHTML = "";
  readTasks(notCompletedTasks);
  hideCompleteBtn.classList.add("hidden");
  showAllTasksBtn.classList.remove("hidden");
}

// LOCAL STORAGE

function saveTasksToLocalStorage() {
  var str = JSON.stringify(tasks);
  localStorage.setItem("tasks", str);
}

function readTasksFromLocalStorage() {
  var str = localStorage.getItem("tasks");
  tasks = JSON.parse(str);
  if (!tasks) {
    tasks = [];
  }
}
