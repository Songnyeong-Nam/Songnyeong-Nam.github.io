const todoForm = document.getElementById('todoForm')
const todoInput = todoForm.querySelector('input')
const todoContainer = document.querySelector('.todo')
const todoList = todoContainer.querySelector('.todoList')
const finishedList = todoContainer.querySelector('.finishedList')
const delAll = document.querySelector('.delAll')
const fold = document.querySelector('.fold')

const TODOS_LS = "todos"
const FINISHED_LS = 'finished'
let isOpen = true;
let todos = [];
let finished = [];

function saveTodos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(todos))
}
function checkTodo(e) {
    const targetedId = e.target.parentNode;
    addFinished(targetedId)
    filterTodo(targetedId);
    todoList.removeChild(targetedId);
}
function deleteTodo(e) {
    alert(`it's not finished. Remove from the list?`)
    const targetedId = e.target.parentNode;
    todoList.removeChild(targetedId)
    filterTodo(targetedId)
}
function filterTodo(targetedId) {
    const cleanTodos = todos.filter((todo) => {
        return todo.id !== parseInt(targetedId.id)
    })
    todos = cleanTodos;
    saveTodos();
}
function addTodo(targetedId) {
    const targetedTodo = finished.filter(todo => {
        return todo.id === parseInt(targetedId.id)
    })
    createTodo(targetedTodo[0].content)
    saveTodos()
}
function addFinished(targetedId) {
    const targetedTodo = todos.filter(todo => {
        return todo.id === parseInt(targetedId.id)
    })
    createFinished(targetedTodo[0])
    saveFinished();
}
function saveFinished() {
    localStorage.setItem(FINISHED_LS, JSON.stringify(finished))
}
function deleteFinished(e) {
    const targetedTodo = e.target.parentNode;
    finishedList.removeChild(targetedTodo)
    const cleanedFinished = finished.filter(todo => {
        return todo.id !== parseInt(targetedTodo.id)
    })
    finished = cleanedFinished;
    saveFinished();
}
function filterFinished(targetedId) {
    const cleanTodos = finished.filter((todo) => {
        return todo.id !== parseInt(targetedId.id)
    })
    finished = cleanTodos;
    saveFinished();
}
function undoFinished(e) {
    const targetedId = e.target.parentNode;
    addTodo(targetedId)
    filterFinished(targetedId)
    finishedList.removeChild(targetedId)
}
function findContent(target) {
    const one = todos.filter(todo => {
        return todo.id === target.id
    })
    return one[0]
}

function createFinished(todo) {
    const newFinished = document.createElement('li');
    const delBtn = document.createElement('button');
    const div = document.createElement('div');
    delBtn.innerText = '🗑';
    delBtn.classList.add('delBtn')
    delBtn.addEventListener('click', deleteFinished)
    div.addEventListener('click', undoFinished)
    div.classList.add('finished')
    div.innerText = todo.content;
    newFinished.appendChild(div);
    newFinished.append(delBtn);
    newFinished.id = todo.id;
    finishedList.appendChild(newFinished);
    const finishedObj = {
        content: todo.content,
        id: todo.id,
    }
    finished.push(finishedObj);
    localStorage.setItem(FINISHED_LS, JSON.stringify(finished));
}
function createTodo(todo) {
    const newtodo = document.createElement('li');
    const delBtn = document.createElement('button');
    const div = document.createElement('div');
    const newId = Date.now();
    delBtn.innerText = '🗑';
    delBtn.classList.add('delBtn')
    delBtn.addEventListener('click', deleteTodo)
    div.addEventListener('click', checkTodo)
    div.innerText = todo;
    newtodo.appendChild(div);
    newtodo.append(delBtn);
    newtodo.id = newId;
    todoList.appendChild(newtodo);
    const todoObj = {
        content: todo,
        id: newId,
    }
    todos.push(todoObj);
    saveTodos();
}
function deleteAll() {
    localStorage.removeItem(TODOS_LS)
    localStorage.removeItem(FINISHED_LS)
    while (todoList.hasChildNodes()) {
        todoList.removeChild(todoList.firstChild);
    }
    while (finishedList.hasChildNodes()) {
        finishedList.removeChild(finishedList.firstChild);
    }

}
function handleSubmit(e) {
    e.preventDefault()
    const currentValue = todoInput.value;
    if (currentValue !== "") {
        createTodo(currentValue);
        todoInput.value = '';
    }
    else {
        todoInput.classList.add('warning')
        setTimeout(() => { todoInput.classList.remove('warning') }, 1000)
    }
}
function loadTodos() {
    const loadedTodos = localStorage.getItem(TODOS_LS)
    const loadedFinished = localStorage.getItem(FINISHED_LS)
    if (loadedTodos !== null && loadedTodos.length > 0) {
        const parsedTodos = JSON.parse(loadedTodos);
        parsedTodos.forEach(item => createTodo(item.content));
    }
    if (loadedFinished !== null && loadedFinished.length > 0) {
        const parsedFinished = JSON.parse(loadedFinished);
        parsedFinished.forEach(item => createFinished(item));
    }
}

function handleFold() {
   isOpen = !isOpen
   if(!isOpen){
       console.log(todoContainer)
       fold.classList.add('rotate')
       todoContainer.querySelector('div').classList.add('none')
   } else{
       fold.classList.remove('rotate')
       todoContainer.querySelector('div').classList.remove('none')   }
}

function init() {
    loadTodos();
    todoForm.addEventListener('submit', handleSubmit)
    delAll.addEventListener('click', deleteAll)
    fold.addEventListener('click',handleFold)
}

init();