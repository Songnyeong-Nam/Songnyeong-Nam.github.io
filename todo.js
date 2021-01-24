const todoForm = document.getElementById('todoForm')
const todoInput = todoForm.querySelector('input')
const todoList = document.querySelector('.todoList')
const finishedList = document.querySelector('.finishedList')

const TODOS_LS = "todos"
const FINISHED_LS = 'finished'
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
    console.log(targetedId, targetedTodo)
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
function handleSubmit(e) {
    e.preventDefault()
    const currentValue = todoInput.value;
    if (currentValue !== "") {
        createTodo(currentValue);
        todoInput.value = '';
    }
    else{
        todoInput.classList.add('warning')
        setTimeout(() => {todoInput.classList.remove('warning')},1000)
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

function init() {
    loadTodos();
    todoForm.addEventListener('submit', handleSubmit)
}

init();