const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

//const todo = {id; text: 'some text', checked: false};

let todos = [];
let id = 0;

if(localStorage.length > 0) { 
  for(let i = 0; i < localStorage.length; i++) {
    todos.push(JSON.parse(window.localStorage.getItem(localStorage.key(i))));
  }
  id = todos.reduce((max, current) => max.id > current.id ? max : current).id + 1; // retrieved id from last session 
  render();
}


window.onclose = function()
{
  window.localStorage.setItem(id, JSON.stringify(id));
}

function newTodo() {
  //get Text
  const text = prompt('Enter task to do');
  //create todo
  const todo = {id: id++, text, checked: false};
  
  //append to list
  todos.push(todo);
  //render
  window.localStorage.setItem(id, JSON.stringify(todo))
  console.log('todos: ', todos);
  render();
  
}

function render() {
  list.innerHTML=""; //очищаємо li перед додаванням наступного таску
  todos.map(todo => renderTodo(todo)).forEach(todo => list.append(todo));
  //update counters
  itemCountSpan.textContent = todos.length;
  uncheckedCountSpan.textContent= todos.filter(todo => todo.checked == false).length;
}

function renderTodo({id, text, checked}) {
  let li = document.createElement('li');
  li.innerHTML = `<input type="checkbox" onChange="toggleTodo(${id})" ${checked ? 'checked' : ''}>
  <span>${text}</span>
  <button class="button-2" onClick="deleteTodo(${id})">delete</button>`
  return li;
}

function deleteTodo(id) {
//console.log('from delete todo: ',id);
todos = todos.filter(todo => todo.id !== id);
window.localStorage.removeItem(id)
  //find todo to delate
  //delene todo
  render();
}

function toggleTodo(id) {
  //todos = todos.map(todo => todo.id === id ? {id: todo.id, text: todo.text, chacked: !todo.chacked} : todo);
  todos = todos.map(todo => todo.id === id ? {...todo, checked: !todo.checked} : todo);

  render();
}
