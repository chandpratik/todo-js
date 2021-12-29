var selectedCardId = {
  id: null,
};

var backGroundCardId = {
  id: null,
};

// selectors
const container = document.querySelector('.container');
const addBtn = document.getElementById('add-btn');
const addBtnSingleTodo = document.getElementById('add-btn-single-todo');
const cardModalContainer = document.getElementById('todo-card-modal-container');
const listModalContainer = document.getElementById('todo-list-modal-container');

const closeBtn = document.querySelector('.close-btn');
const closeTodoModalBtn = document.getElementById('close-todo-modal-btn');

const addCardBtn = document.querySelector('#add-card-btn');
const addTodoBtn = document.getElementById('add-todo-btn');

const todoContainer = document.querySelector('.todo-container');
const btnContainer = document.querySelector('.btn-container');

const singleTodoCardContainer = document.querySelector(
  '.single-todo-container'
);

document.addEventListener('click', function (e) {
  if (e.target && e.target.id == 'add-card-btn') {
    const deleteButton = document.querySelectorAll('.delete-btn');
    deleteButton.forEach(elem => elem.addEventListener('click', deleteCard));
    const addTodoButton = document.querySelectorAll('.add-button');
    addTodoButton.forEach(elem => {
      elem.addEventListener('click', openTodoModal);
    });
    const title = document.querySelectorAll('.todo-card-title');
    title.forEach(elem => {
      elem.addEventListener('click', openSingleTodoCard);
    });
  }

  if (e.target && e.target.id == 'todo-status-btn') {
    e.target.previousElementSibling.classList.add('strike-through');
    e.target.remove();
  }
});

addBtn.addEventListener('click', openModal);
addBtnSingleTodo.addEventListener('click', openModal);

closeBtn.addEventListener('click', closeModal);

addCardBtn.addEventListener('click', addCard);

addTodoBtn.addEventListener('click', addTodo);

closeTodoModalBtn.addEventListener('click', closeTodoModal);

function openModal() {
  cardModalContainer.style.display = 'block';
}

function closeModal() {
  cardModalContainer.style.display = 'none';
}

function addCard() {
  const noTodoContainer = document.querySelector('.no-todo');
  if (noTodoContainer) {
    noTodoContainer.remove();
  }
  const todoCardTitle = document.getElementById('todo-title').value;
  let id = Date.now();
  const cardBody = `<div class="todo-card" id="${id}">
    <h3 class="todo-card-title">${todoCardTitle}</h3>
    <div class="btn-container">
      <i
        class="fas fa-plus-circle fa-lg add-button"
        style="color: Dodgerblue"
      ></i>
      <i class="fas fa-trash fa-lg delete-btn"></i>
    </div>
  </div>`;
  todoContainer.insertAdjacentHTML('beforeend', cardBody);
  cardModalContainer.style.display = 'none';
  singleTodoCardContainer.style.display = 'none';
  container.style.display = 'block';
  document.getElementById('todo-title').value = '';
}

function deleteCard(e) {
  e.target.parentNode.parentNode.remove();
  if (todoContainer.childElementCount < 1) {
    todoContainer.insertAdjacentHTML(
      'afterbegin',
      `<div class="no-todo">No items in the todo list</div>`
    );
  }
}

function openTodoModal(e) {
  listModalContainer.style.display = 'block';
  selectedCardId.id = e.target.parentNode.parentNode.id;
}

function closeTodoModal() {
  selectedCardId.id = null;
  document.getElementById('todo-item-title').value = '';
  listModalContainer.style.display = 'none';
}

function addTodo() {
  let todoValue = document.getElementById('todo-item-title').value;
  const lastChild = document.getElementById(selectedCardId.id).lastElementChild;
  const todo = `<div class="todo">
    <div class="todo-task" >${todoValue}</div>
    <div id="todo-status-btn">Mark as done</div>
  </div>`;
  lastChild.insertAdjacentHTML('beforebegin', todo);

  if (backGroundCardId.id) {
    const lastBackgroundElementChild = document.getElementById(
      backGroundCardId.id
    ).lastElementChild;
    lastBackgroundElementChild.insertAdjacentHTML('beforebegin', todo);
  }
  selectedCardId.id = null;
  document.getElementById('todo-item-title').value = '';
  listModalContainer.style.display = 'none';
}

function hideSingleTodoCard(e) {
  if (
    e.target.parentNode.parentNode.nextElementSibling?.querySelectorAll('.todo')
  ) {
    e.target.parentNode.parentNode.nextElementSibling
      .querySelectorAll('.todo')
      .forEach(todo => {
        console.log(todo);
        todo.remove();
      });
  }
  singleTodoCardContainer.style.display = 'none';
  container.style.display = 'block';
  selectedCardId.id = null;
  backGroundCardId.id = null;
}

function openSingleTodoCard(e) {
  singleTodoCardContainer.style.display = 'flex';
  container.style.display = 'none';
  selectedCardId.id = e.target.parentNode.id;
  backGroundCardId.id = e.target.parentNode.id;

  const parentElement = document.getElementById(selectedCardId.id);
  const backButton = document.querySelector('.todo-back');
  const singleTodoHeading = document.querySelector(
    '.single-todo-heading'
  ).firstElementChild;
  const singleTodoCardHeading = document.querySelector(
    '.single-todo-card-title'
  );

  backButton.addEventListener('click', hideSingleTodoCard);
  const title = parentElement.firstElementChild.textContent;
  console.log(singleTodoCardHeading, singleTodoHeading, title);
  singleTodoHeading.textContent = title;
  singleTodoCardHeading.textContent = title;

  for (let i = 0; i < parentElement.childNodes.length; i++) {
    if (parentElement.childNodes[i].className == 'todo') {
      singleTodoCardHeading.insertAdjacentHTML(
        'afterend',
        parentElement.childNodes[i].outerHTML
      );
    }
  }
}

singleTodoCardContainer.addEventListener('click', e => {
  if (e.target.parentNode.parentNode.className === 'single-todo-card') {
    const parentElement = document.getElementById(backGroundCardId.id);
    const content = e.target.previousElementSibling.textContent;
    for (let i = 0; i < parentElement.childNodes.length; i++) {
      if (
        parentElement.childNodes[i].className == 'todo' &&
        parentElement.childNodes[i].firstElementChild.textContent === content
      ) {
        parentElement.childNodes[i].firstElementChild.classList.add(
          'strike-through'
        );
        parentElement.childNodes[i].lastElementChild.remove();
      }
    }
  }
});
