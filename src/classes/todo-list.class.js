import { Todo } from "./todo.class";

export class TodoList{

    constructor(){
        // this.todos = [];
        this.loadLocalStorage();
    }

    newTodo(task){
        this.todos.push(task);
        this.saveLocalStorage();
    }

    deleteTodo(id){
        this.todos = this.todos.filter( todo => todo.id != id);
        this.saveLocalStorage();
        // for( let i = 0; i < this.todos.length; i++){ 
        //     // if ( this.todos[i].id == id) { 
        //     //     this.todos.splice(i, 1); 
        //     // }
        // }
    }

    toggleTodo(id){
        for (const todo of this.todos) {
            if(todo.id == id){
                todo.completed = !todo.completed;
                this.saveLocalStorage();
                break;
            }
        }
    }

    deleteCompleted(){
        this.todos = this.todos.filter( todo => !todo.completed);
        this.saveLocalStorage();
    }
    
    countUndone(){
        let undone = this.todos.filter( todo => !todo.completed);
        return undone.length;
    }

    saveLocalStorage(){
        localStorage.setItem('todo', JSON.stringify(this.todos));
        let count = this.countUndone();
        localStorage.setItem('undone', count );
    }
    
    loadLocalStorage(){
        this.todos = (localStorage.getItem('todo')) ? JSON.parse(localStorage.getItem('todo')) : [];
        this.todos = this.todos.map(Todo.fromJson);
        let count = this.countUndone();
        localStorage.setItem('undone', count );
        
        // this.todos = this.todos.map((obj) => Todo.fromJson(obj));
        // if(localStorage.getItem('todo')){
        //     this.todos = JSON.parse(localStorage.getItem('todo'));
        //     console.log(typeof this.todos);
        // }else{
        //     this.todos = [];
        // }
    }
}