import { listContainer, displaytasks, tasks } from './myShow.js';

const form = document.querySelector('.form');
const todoInput = document.querySelector('#todo-input');
const arrow = document.querySelector('.arrow-img');
/* eslint-disable no-use-before-define */
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    saveTodo();
    displaytasks();
    localStorage.setItem('tasks', JSON.stringify(tasks));
  });
}

if (arrow) {
  arrow.addEventListener('click', () => {
    saveTodo();
    displaytasks();
    localStorage.setItem('tasks', JSON.stringify(tasks));
  });
}

// Save todo function
export const saveTodo = (todoIndex = null, todoValue = todoInput.value) => {
  if (todoIndex !== null) {
    tasks.description = todoValue;
  } else {
    const index = tasks.length + 1;
    tasks.push({
      description: todoValue,
      completed: false,
      index,
    });
  }

  // todoInput.value = '';
};

// eventlistener for all Tasks
if (listContainer) {
  listContainer.addEventListener('click', (e) => {
    const { target } = e;
    const parentElement = target.parentNode;
    if (parentElement.className !== 'todo') {
      return;
    }
    // todo id
    const todo = parentElement;
    const todoId = Number(todo.id);
    // target action
    const actions = target.dataset.action;
    if (actions === 'edit') {
      editTodo(todoId);
    } else if (actions === 'delete') {
      deleteTodo(todoId);
    } else if (actions === 'check') {
      checkTodo(todoId);
    }
  });
}

export const editTodo = (todoId) => {
  const container = document.getElementById(todoId);
  if (!container) {
    return;
  }
  const taskDescription = container.querySelector('.list-text');
  const editIcon = container.querySelector('.Edit');
  const deleteIcon = container.querySelector('.delete');
  taskDescription.contentEditable = true;
  taskDescription.focus();
  editIcon.classList.add('hide');
  deleteIcon.classList.add('show');
  taskDescription.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      saveTodo(todoId - 1, taskDescription.textContent);
      displaytasks();
      localStorage.setItem('tasks', JSON.stringify(tasks));
      taskDescription.contentEditable = false;
      editIcon.classList.remove('hide');
      deleteIcon.classList.remove('show');
    }
  });
};

export const deleteTodo = (todoId) => {
  tasks.splice(todoId - 1, 1); // remove one element at index todoId -1
  const todoElement = document.getElementById(todoId);
  if (todoElement) {
    todoElement.parentNode.removeChild(todoElement);
  }
  for (let i = 0; i < tasks.length; i += 1) {
    tasks[i].index = i + 1;
  }
  displaytasks();
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

export function checkTodo(todoId) {
  tasks.forEach((todo, index) => {
    if (index === todoId - 1) {
      todo.completed = !todo.completed;
    }
  });
  displaytasks();
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

export const btnClear = document.querySelector('.clear-btn');
if (btnClear) {
  btnClear.addEventListener('click', () => {
    const incompleteTasks = tasks.filter((todo) => !todo.completed);
    tasks.length = 0; // clear the original tasks array
    tasks.push(...incompleteTasks); // add the incomplete tasks back to the original array
    for (let i = 0; i < tasks.length; i += 1) {
      tasks[i].index = i + 1;
    }
    displaytasks();
    localStorage.setItem('tasks', JSON.stringify(tasks));
  });
}
