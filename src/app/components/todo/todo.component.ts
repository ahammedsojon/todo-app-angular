import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todos:any = [];
  todoParam:any = {
    todo: '',
    index: null
  };

  constructor() { }

  ngOnInit(): void {
  }

  addTodo() {
    this.todos.push(this.todoParam.todo);
    this.todoParam.todo = '';
  }

  editTodo(todo:string, index:number){
    this.todoParam.todo = todo;
    this.todoParam.index = index;
  }

  saveTodo(){
    this.todos[this.todoParam.index] = this.todoParam.todo;
    this.todoParam.todo = '';
  }

  deleteTodo(index:number){
    this.todos.splice(index, 1);
  }

  clearTodos(){
    this.todos = [];
  }
}
