var selectedCardId = {
  id: null,
};

// selectors
const addBtn = document.getElementById('add-btn');
const cardModalContainer = document.getElementById('todo-card-modal-container');
const listModalContainer = document.getElementById('todo-list-modal-container');

const closeBtn = document.querySelector('.close-btn');
const closeTodoModalBtn = document.getElementById('close-todo-modal-btn');

const addCardBtn = document.querySelector('#add-card-btn');
const addTodoBtn = document.getElementById('add-todo-btn');

const todoContainer = document.querySelector('.todo-container');
const btnContainer = document.querySelector('.btn-container');

document.addEventListener('click', function (e) {
  if (e.target && e.target.id == 'add-card-btn') {
    const deleteButton = document.querySelectorAll('.delete-btn');
    deleteButton.forEach(elem => elem.addEventListener('click', deleteCard));
    const addTodoButton = document.querySelectorAll('.add-button');
    addTodoButton.forEach(elem => {
      elem.addEventListener('click', openTodoModal);
    });
  }

  if (e.target && e.target.id == 'todo-status-btn') {
    e.target.previousElementSibling.classList.add('strike-through');
    e.target.remove();
  }
});

addBtn.addEventListener('click', openModal);

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
  const card = `<div class="todo-card" id="${Date.now()}">
  <h3 class="todo-card-title">${todoCardTitle}</h3>
  <div class="btn-container">
    <i
      class="fas fa-plus-circle fa-lg add-button"
      style="color: Dodgerblue"
    ></i>
    <i class="fas fa-trash fa-lg delete-btn"></i>
  </div>
</div>`;

  todoContainer.insertAdjacentHTML('beforeend', card);
  cardModalContainer.style.display = 'none';
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
  document.getElementById('todo-item-title').value = '';
  selectedCardId.id = null;
  listModalContainer.style.display = 'none';
}
