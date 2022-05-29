window.onload = () => {
  mainApp()
}

function mainApp() {
  if (isLocalStorageEmpty()) addTemplateTasks()
  else displayAllTasksFromLocalStorage()
  const inputBox = document.querySelector('#new-task-input') as HTMLInputElement
  const addNewTaskBtn = document.querySelector('.add-new-task-btn') as HTMLButtonElement

  inputBox.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') addNewTaskBtn.click()
  })

  addNewTaskBtn.addEventListener('click', () => {
    const testDesc: string = getNewTaskDesc()
    if (testDesc.length !== 0)
      addNewTask(testDesc)
    clearInputBox()
  });

  const clearAllBtn = document.querySelector('.clear-all-btn') as HTMLButtonElement
  clearAllBtn.addEventListener('click', () => {
    removeAllTasks()
  })
}

function getNewTaskDesc() {
  const textInputEl = document.querySelector('#new-task-input') as HTMLInputElement
  return textInputEl.value
}

function clearInputBox() {
  const textInputEl = document.querySelector('#new-task-input') as HTMLInputElement
  textInputEl.value = ''
}

function addNewTask(taskDesc: string) {
  displayTask(taskDesc)

  const taskObj = {
    desc: taskDesc
  }
  addTaskToLocalStorage(taskObj)

  return taskObj
}

function displayTask(taskDesc: string) {
  const allTasksList = document.querySelector('.all-tasks-list') as HTMLUListElement

  const newTaskContainer = createNewHtmlEl('li', 'task-container', '', allTasksList)
  newTaskContainer.id = (allTasksList.childElementCount - 1).toString()

  const newTaskText = createNewHtmlEl('p', 'task-content', taskDesc, newTaskContainer)

  const newTaskBtnsContainer = createNewHtmlEl('div', 'task-btns-container', '', newTaskContainer)

  const newTaskEdit = createNewHtmlEl('button', 'edit-task', 'Edit', newTaskBtnsContainer)

  const newTaskDelete = createNewHtmlEl('button', 'delete-task', 'Delete', newTaskBtnsContainer)

  newTaskEdit.addEventListener('click', () => {
    editTask(newTaskText)
  })

  newTaskDelete.addEventListener('click', () => {
    deleteTask(newTaskContainer)
  })

}

function createNewHtmlEl(tag: string, className: string, text: string, parentElement: HTMLElement) {
  const newHtmlElement = document.createElement(tag)
  newHtmlElement.className = className;
  newHtmlElement.innerText = text;

  parentElement.appendChild(newHtmlElement)
  return newHtmlElement
}

function removeAllTasks() {
  removeAllTasksGUI()
  clearLocalStorage()
}

function removeAllTasksGUI() {
  const tasksList = document.querySelector('.all-tasks-list') as HTMLUListElement
  tasksList.replaceChildren()
}

function editTask(taskHtmlEl: HTMLElement) {
  console.log('In editing function', taskHtmlEl);
}



// Local storage functions

function displayTaskFromLocalStorage(key: string) {
  displayTask(JSON.parse(localStorage.getItem(key) as string).desc)
}

function deleteTask(taskHtmlEl: HTMLElement) {
  deleteTaskFromLocalStorage(taskHtmlEl.id)
  taskHtmlEl.remove()
}

function deleteTaskFromLocalStorage(key: string) {
  console.log(key)
  localStorage.removeItem(key)
}

function clearLocalStorage() {
  localStorage.clear()
}

function addTaskToLocalStorage(taskObj: object) {
  localStorage.setItem(localStorage.length.toString(), JSON.stringify(taskObj))
}

function isLocalStorageEmpty() {
  return localStorage.length === 0
}

function addTemplateTasks() {
  addNewTask('Take the dog for a walk')
  addNewTask('Make lunch')
}

function displayAllTasksFromLocalStorage() {
  for (let i = 0; i < localStorage.length; i++) {
    displayTaskFromLocalStorage(i.toString())

  }
}
