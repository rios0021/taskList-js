
import './styles.css';
import {Todo, TodoList} from './classes';
import {createTodoHtml} from './js/components';
export const todoList = new TodoList();
const strongUndone = document.querySelector('.undone');

todoList.todos.forEach(createTodoHtml);
strongUndone.textContent = todoList.countUndone();
// Same as:
// todoList.todos.forEach(todo => createTodoHtml(todo));
