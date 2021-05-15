"use strict";

let iOsHeight = document.body.clientHeight;

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

let tasks = [
  { id: 1, name: "Prvi zadatak", status: "checked" },
  { id: 2, name: "Drugi zadatak", status: "" },
  { id: 3, name: "Prvi zadatak", status: "checked" },
  { id: 4, name: "Drugi zadatak", status: "" },
  { id: 5, name: "Prvi zadatak", status: "checked" },
  { id: 6, name: "Drugi zadatak", status: "" },
  { id: 7, name: "Prvi zadatak", status: "checked" },
  { id: 8, name: "Drugi zadatak", status: "" },
  { id: 9, name: "Prvi zadatak", status: "checked" },
  { id: 10, name: "Drugi zadatak", status: "" },
  { id: 11, name: "Prvi zadatak", status: "checked" },
  { id: 12, name: "Drugi zadatak", status: "" },
  { id: 13, name: "Prvi zadatak", status: "checked" },
  { id: 14, name: "Drugi zadatak", status: "" },
];

// TASK FUNCTIONS ------------------------------------------------------------------------------------------------

// READ EXISTING TASKS

function readTasks(input) {
  taskList.innerHTML = "";

  input.forEach((task) =>
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
        <input class="edit-task-input" type="text" placeholder="Enter task name" onkeydown="changeCancelOnKeydown(this)" onkeypress="toggleSidebarShortcut()"/>
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

  hideCompleteBtn.classList.remove("hidden");
  showAllTasksBtn.classList.add("hidden");
}

readTasks(tasks);

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
        <input class="edit-task-input" type="text" placeholder="Enter task name" onkeydown="changeCancelOnKeydown(this)" onkeypress="toggleSidebarShortcut()"/>
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

// TEST

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
        <input class="edit-task-input" type="text" placeholder="Enter task name" onkeydown="changeCancelOnKeydown(this)" onkeypress="toggleSidebarShortcut()"/>
        <button class="apply-button" onclick="applyChange(this)">
        Apply
        </button>
        <button class="cancel-button" onclick="cancelChange(this)">
          Cancel
        </button>
      </form>
    </li>`
    );
    newTaskModal.classList.add("hidden");
    addNewTaskBtnModal.classList.add("disabled-button");
    newTaskModalForm.removeEventListener("click", addNewTask);

    newTaskModalInput.value = "";
  }
  event.preventDefault();
}

// TEST KRAJ

// function toggleSidebarShortcut() {
//   if (event.key === "n") {
//     toggleSidebar();
//   }
// }

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

  if (input !== "") {
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
