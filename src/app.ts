window.onload = () => {
  mainApp()
}

function mainApp() {
  if (isLocalStorageEmpty()) addTemplateTasks()
  else displayAllTasksFromLocalStorage()
  const inputBox = document.querySelector('#new-task-input') as HTMLInputElement
  const addNewTaskBtn = document.querySelector('.add-new-task-btn') as HTMLButtonElement

  document.querySelector('main')!.addEventListener('click', countActiveTasks)

  inputBox.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') addNewTaskBtn.click()
  })

  addNewTaskBtn.addEventListener('click', () => {
    const taskDesc: string = getNewTaskDesc()
    if (taskDesc.length !== 0) {
      const taskObj = {
        desc: taskDesc,
        checked: false
      }
      addNewTask(taskObj)
    }
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

function addNewTask(taskObj: object) {
  displayTask(taskObj)
  addTaskToLocalStorage(taskObj)

  return taskObj
}

function displayTask(taskObj: any) {
  const allTasksList = document.querySelector('.all-tasks-list') as HTMLUListElement

  const newTaskContainer = createNewHtmlEl('li', 'task-container', '', allTasksList)
  newTaskContainer.id = (allTasksList.childElementCount - 1).toString()

  const newTaskText = createNewHtmlEl('p', 'task-content', taskObj.desc, newTaskContainer)

  const newTaskBtnsContainer = createNewHtmlEl('div', 'task-btns-container', '', newTaskContainer)

  const newTaskEdit = createNewHtmlEl('button', 'edit-task', 'Edit', newTaskBtnsContainer)

  const newTaskDelete = createNewHtmlEl('button', 'delete-task', 'Delete', newTaskBtnsContainer)

  if (taskObj.checked)
    newTaskContainer.children[0].classList.add('checked')

  newTaskContainer.addEventListener('click', () => {
    toggleCheckTask(newTaskContainer)
  })

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

function toggleCheckTask(taskContainer: HTMLElement) {
  taskContainer.children[0].classList.toggle('checked')
  toggleCheckTaskLocalStorage(taskContainer.id)
}

function countActiveTasks() {
  let activeTasksCounter = 0
  for (let i = 0; i < localStorage.length; i++) {
    if (!JSON.parse(localStorage.getItem(i.toString()) as string).checked) activeTasksCounter++
  }
  document.querySelector('.activeTasksCntr')!.textContent = activeTasksCounter.toString()
}

// Local storage functions

function toggleCheckTaskLocalStorage(key: string) {
  const taskObj = JSON.parse(localStorage.getItem(key) as string)
  taskObj.checked = !taskObj.checked
  localStorage.setItem(key, JSON.stringify(taskObj))
}

function deleteTask(taskHtmlEl: HTMLElement) {
  deleteTaskFromLocalStorage(taskHtmlEl.id)
  taskHtmlEl.remove()
}

function deleteTaskFromLocalStorage(key: string) {
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
  const taskObj1 = {
    desc: 'Take the dog for a walk',
    checked: false
  }
  const taskObj2 = {
    desc: 'Make lunch',
    checked: false
  }
  addNewTask(taskObj1)
  addNewTask(taskObj2)
}

function displayTaskFromLocalStorage(taskObj: object) {
  displayTask(taskObj)
}

function displayAllTasksFromLocalStorage() {
  for (let i = 0; i < localStorage.length; i++) {
    displayTaskFromLocalStorage(JSON.parse(localStorage.getItem(i.toString()) as string))

  }
}
