'use strict';

// Seleceting elements
// Inputs
const toDoTask = document.querySelector('.new-to-do');
const taskInProgress = document.querySelector('.new-progress');
const finishedTask = document.querySelector('.new-done');

// Buttons
const toDoSubmit = document.querySelector('.to-do-submit');
const progressSubmit = document.querySelector('.in-progress-submit');
const finishedSubmit = document.querySelector('.done-submit');

// Display divs
const toDoTaskListContainer = document.querySelector('.display-to-do');
const progressTaskListContainer = document.querySelector(
  '.display-in-progress'
);
const finishedTaskListContainer = document.querySelector('.display-done');

const containers = [
  toDoTaskListContainer,
  progressTaskListContainer,
  finishedTaskListContainer,
];

let taskName,
  task,
  deleteBtn,
  toDoTaskList = [],
  taskInProgressList = [],
  finishedTaskList = [];

function createTaskElements(typeOfTask, taskList, container) {
  // Get task value
  taskName = typeOfTask.value;
  // Create task element
  task = document.createElement('div');
  task.classList.add('task-to-do', 'displayed');
  task.textContent = `${taskName}`;
  task.setAttribute('draggable', 'true');

  deleteBtn = document.createElement('button');
  deleteBtn.classList.add('delete-task');
  deleteBtn.textContent = '✖';

  task.appendChild(deleteBtn);

  // If task exist add it to HTML and push it to task array
  if (taskName) {
    container.appendChild(task);
    taskList.push(task);
    typeOfTask.value = '';
  }
  dragAndDrop(taskList);
}

// Add to-do task
toDoSubmit.addEventListener('click', () => {
  createTaskElements(toDoTask, toDoTaskList, toDoTaskListContainer);
});

// Add task in progress
progressSubmit.addEventListener('click', () => {
  createTaskElements(
    taskInProgress,
    taskInProgressList,
    progressTaskListContainer
  );
});

// Add finished task
finishedSubmit.addEventListener('click', () => {
  createTaskElements(finishedTask, finishedTaskList, finishedTaskListContainer);
});

// Delete task
function deleteTask(e, taskList) {
  let curTask, curTaskIndex;
  if (e.target.className === 'delete-task') {
    // Get current task
    curTask = e.target.parentElement;
    // Remove from UI
    curTask.remove();
    // Remove from list
    curTaskIndex = taskList.indexOf(curTask);
    taskList.splice(curTaskIndex, 1);
  }
}

toDoTaskListContainer.addEventListener('click', function (e) {
  deleteTask(e, toDoTaskList);
});

progressTaskListContainer.addEventListener('click', function (e) {
  deleteTask(e, taskInProgressList);
});

finishedTaskListContainer.addEventListener('click', function (e) {
  deleteTask(e, finishedTaskList);
});

// Drag element from one container to another
function dragAndDrop(taskList) {
  // Events on task elements
  taskList.forEach(taskEl => {
    taskEl.addEventListener('dragstart', () => {
      taskEl.classList.add('dragging');
    });

    taskEl.addEventListener('dragend', () => {
      taskEl.classList.remove('dragging');
    });
  });

  // Events on containers
  containers.forEach(container => {
    container.addEventListener('dragover', e => {
      e.preventDefault();
      const curEl = document.querySelector('.dragging');
      container.appendChild(curEl);
    });
  });
}

// get element position
