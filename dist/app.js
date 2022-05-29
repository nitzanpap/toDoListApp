var app =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

	"use strict";
	window.onload = () => {
	    mainApp();
	};
	function mainApp() {
	    if (isLocalStorageEmpty())
	        addTemplateTasks();
	    else
	        displayAllTasksFromLocalStorage();
	    const inputBox = document.querySelector('#new-task-input');
	    const addNewTaskBtn = document.querySelector('.add-new-task-btn');
	    countActiveTasks();
	    document.querySelector('main').addEventListener('click', countActiveTasks);
	    inputBox.addEventListener('keypress', (event) => {
	        if (event.key === 'Enter')
	            addNewTaskBtn.click();
	    });
	    addNewTaskBtn.addEventListener('click', () => {
	        const taskDesc = getNewTaskDesc();
	        if (taskDesc.length !== 0) {
	            const taskObj = {
	                desc: taskDesc,
	                checked: false
	            };
	            addNewTask(taskObj);
	        }
	        clearInputBox();
	    });
	    const clearAllBtn = document.querySelector('.clear-all-btn');
	    clearAllBtn.addEventListener('click', () => {
	        removeAllTasks();
	    });
	}
	function getNewTaskDesc() {
	    const textInputEl = document.querySelector('#new-task-input');
	    return textInputEl.value;
	}
	function clearInputBox() {
	    const textInputEl = document.querySelector('#new-task-input');
	    textInputEl.value = '';
	}
	function addNewTask(taskObj) {
	    displayTask(taskObj);
	    addTaskToLocalStorage(taskObj);
	    return taskObj;
	}
	function displayTask(taskObj) {
	    const allTasksList = document.querySelector('.all-tasks-list');
	    const newTaskContainer = createNewHtmlEl('li', 'task-container', '', allTasksList);
	    newTaskContainer.id = (allTasksList.childElementCount - 1).toString();
	    createNewHtmlEl('p', 'task-content', taskObj.desc, newTaskContainer);
	    const newTaskBtnsContainer = createNewHtmlEl('div', 'task-btns-container', '', newTaskContainer);
	    const newTaskEdit = createNewHtmlEl('button', 'edit-task', 'Edit', newTaskBtnsContainer);
	    const newTaskDelete = createNewHtmlEl('button', 'delete-task', 'Delete', newTaskBtnsContainer);
	    if (taskObj.checked)
	        newTaskContainer.children[0].classList.add('checked');
	    newTaskContainer.addEventListener('click', () => {
	        toggleCheckTask(newTaskContainer);
	        countActiveTasks();
	    });
	    newTaskEdit.addEventListener('click', () => {
	        editTask(newTaskContainer);
	        countActiveTasks();
	    });
	    newTaskDelete.addEventListener('click', () => {
	        deleteTask(newTaskContainer);
	        countActiveTasks();
	    });
	}
	function createNewHtmlEl(tag, className, text, parentElement) {
	    const newHtmlElement = document.createElement(tag);
	    newHtmlElement.className = className;
	    newHtmlElement.innerText = text;
	    parentElement.appendChild(newHtmlElement);
	    return newHtmlElement;
	}
	function removeAllTasks() {
	    removeAllTasksGUI();
	    clearLocalStorage();
	}
	function removeAllTasksGUI() {
	    const tasksList = document.querySelector('.all-tasks-list');
	    tasksList.replaceChildren();
	}
	function editTask(taskContainer) {
	    // A better fix is neededS
	    toggleCheckTask(taskContainer);
	    console.log('In editing function', taskContainer);
	    // const editingInputBox = document.createElement('input')
	    // editingInputBox.type = 'text'
	    // editingInputBox.placeholder = taskContainer.children[0].textContent as string
	    // editingInputBox.className = 'editing-input-box'
	    // editingInputBox.textContent = taskContainer.children[0].textContent as string
	    // taskContainer.children[0].remove()
	    // taskContainer.prepend(editingInputBox)
	    // taskContainer.children[1].children[0].textContent = 'Save'
	}
	function toggleCheckTask(taskContainer) {
	    taskContainer.children[0].classList.toggle('checked');
	    toggleCheckTaskLocalStorage(taskContainer.id);
	}
	function countActiveTasks() {
	    let activeTasksCounter = 0;
	    for (let i = 0; i < localStorage.length; i++) {
	        if (!JSON.parse(localStorage.getItem(i.toString())).checked)
	            activeTasksCounter++;
	    }
	    document.querySelector('.activeTasksCntr').textContent = activeTasksCounter.toString();
	}
	// Local storage functions
	function toggleCheckTaskLocalStorage(key) {
	    const taskObj = JSON.parse(localStorage.getItem(key));
	    taskObj.checked = !taskObj.checked;
	    localStorage.setItem(key, JSON.stringify(taskObj));
	}
	function deleteTask(taskHtmlEl) {
	    deleteTaskFromLocalStorage(taskHtmlEl.id);
	    taskHtmlEl.remove();
	}
	function deleteTaskFromLocalStorage(key) {
	    localStorage.removeItem(key);
	}
	function clearLocalStorage() {
	    localStorage.clear();
	}
	function addTaskToLocalStorage(taskObj) {
	    localStorage.setItem(localStorage.length.toString(), JSON.stringify(taskObj));
	}
	function isLocalStorageEmpty() {
	    localStorage.removeItem('randid');
	    return localStorage.length === 0;
	}
	function addTemplateTasks() {
	    const taskObj1 = {
	        desc: 'Take the dog for a walk',
	        checked: false
	    };
	    const taskObj2 = {
	        desc: 'Make lunch',
	        checked: false
	    };
	    addNewTask(taskObj1);
	    addNewTask(taskObj2);
	}
	function displayTaskFromLocalStorage(taskObj) {
	    displayTask(taskObj);
	}
	function displayAllTasksFromLocalStorage() {
	    for (let i = 0; i < localStorage.length; i++) {
	        displayTaskFromLocalStorage(JSON.parse(localStorage.getItem(i.toString())));
	    }
	}


/***/ })
/******/ ]);