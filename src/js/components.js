import {Todo} from '../classes';
import {todoList} from  '../index';
// Referencias al html
const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnClearCompleted = document.querySelector('button.clear-completed');
const ulFilters = document.querySelector('ul.filters');
const anchorFiltros =  document.querySelectorAll('.filtro');
const strongUndone = document.querySelector('.undone');

export const createTodoHtml = (todo) => {
    const htmlTodo = `
    <li class="${(todo.completed) ? 'completed' : ''}" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${(todo.completed) ? 'checked' : ''}>
            <label>${todo.task}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>
    `;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;
    divTodoList.append(div.firstElementChild);
    return div.firstElementChild;
}

//Events
txtInput.addEventListener('keyup', (event) =>{
    if(event.keyCode === 13 && txtInput.value.trim() !== ''){
        const newTodo = new Todo(txtInput.value);
        todoList.newTodo(newTodo);
        createTodoHtml(newTodo);
        txtInput.value = '';
        strongUndone.textContent = localStorage.getItem('undone');
        console.log(strongUndone.text);
    }
});

divTodoList.addEventListener('click', (event) =>{
    const elementName = event.target.localName;
    const todoElement = event.target.parentElement.parentElement;
    const todoId      = todoElement.getAttribute('data-id');
    console.log(todoId);

    if(elementName.includes('input')){
        todoList.toggleTodo(todoId);
        todoElement.classList.toggle('completed');
        strongUndone.textContent = localStorage.getItem('undone');
    }else if(elementName.includes('button')){
        todoList.deleteTodo(todoId);
        divTodoList.removeChild(todoElement);
        strongUndone.textContent = localStorage.getItem('undone');
    }
    
});

btnClearCompleted.addEventListener('click', () => {
    todoList.deleteCompleted();
    for(let i = divTodoList.children.length -1; i >=0; i--){
        const element = divTodoList.children[i];
        if(element.classList.contains('completed')){
            divTodoList.removeChild(element);
        }
    }
});

ulFilters.addEventListener('click', (event) => {
    const filtro = event.target.text;
    if(!filtro) {return;}

    anchorFiltros.forEach(element => element.classList.remove('selected'));
    event.target.classList.add('selected');

    for(const element of divTodoList.children){
        element.classList.remove('hidden');
        const completed = element.classList.contains('completed');

        switch(filtro){
            case 'Undone':
                if(completed){
                    element.classList.add('hidden');
                }
                break;
            case 'Completed':
                if(!completed){
                    element.classList.add('hidden');
                }
            break;

        }
    }
});