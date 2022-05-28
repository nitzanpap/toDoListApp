// import { Say } from './shared/say.service';
// import { Dialog } from './shared/dialog';

// class Module {
//   say = new Say();
//   select = 'Dialog';

//   updateSelect(): void {
//     const select = document.getElementById('select') as HTMLSelectElement;
//     this.select = select.value;
//   }

//   updateDisplay(msg: string): void {
//     const display = document.getElementById('display') as HTMLDivElement;
//     display.innerText = msg;
//   }

//   shout(): void {
//     const input = document.getElementById('msg') as HTMLInputElement;
//     switch (this.select) {
//       case 'Alert': this.say.alert(input.value); break;
//       case 'Console': this.say.console(input.value); break;
//       case 'UI': this.updateDisplay(input.value); break;
//       case 'Dialog': dialog.open(input.value); break;
//     }
//   }
// }
// export const module = new Module();
// export const dialog = new Dialog();

window.onload = () => {
  mainApp()
}

function mainApp() {
  const addNewTaskBtn = document.querySelector('.add-new-task-btn') as HTMLButtonElement;
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
  const textInputEl = document.querySelector('#new-task-input') as HTMLInputElement;
  return textInputEl.value
}

function clearInputBox() {
  const textInputEl = document.querySelector('#new-task-input') as HTMLInputElement;
  textInputEl.value = ''
}

function addNewTask(taskDesc: string) {
  const allTasksList = document.querySelector('.all-tasks-list') as HTMLUListElement

  const newTaskContainer = createNewHtmlEl('li', 'task-container', '', allTasksList)

  createNewHtmlEl('p', 'task-content', taskDesc, newTaskContainer)

  const newTaskBtnsContainer = createNewHtmlEl('div', 'task-btns-container', '', newTaskContainer)

  createNewHtmlEl('button', 'edit-task', 'Edit', newTaskBtnsContainer)

  createNewHtmlEl('button', 'delete-task', 'Delete', newTaskBtnsContainer)

  const taskObj = {
    taskIndex: 1,
    description: taskDesc
  }

  addTaskToLocalStorage(taskObj)
}

function createNewHtmlEl(tag: string, className: string, text: string, parentElement: HTMLElement) {
  const newHtmlElement = document.createElement(tag)
  newHtmlElement.className = className;
  newHtmlElement.innerText = text;

  parentElement.appendChild(newHtmlElement)
  return newHtmlElement
}

function addTaskToLocalStorage(taskObj: object) {
  localStorage.setItem('1', JSON.stringify(taskObj))
}

function removeAllTasks() {
  removeAllTasksGUI()
  clearLocalStorage()
}

function removeAllTasksGUI() {
  const tasksList = document.querySelector('.all-tasks-list') as HTMLUListElement
  tasksList.replaceChildren()
}

function clearLocalStorage() {
  localStorage.clear()
}
