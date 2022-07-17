import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { Todo } from '../../Todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];

  todoParam: any = {
    todo: {
      id: null,
      text: '',
      reminder: true,
    },
  };

  constructor(private todoService: TodoService) {}

  // get all todo
  ngOnInit(): void {
    this.todoService.getTodos().subscribe((todos) => (this.todos = todos));
  }

  // add new todo
  addTodo() {
    if (this.todoParam.todo.text === '') {
      return alert('Please add a task!');
    }
    const newTodo = {
      text: this.todoParam.todo.text,
      reminder: this.todoParam.todo.reminder,
    };
    this.todoService
      .addNewTodo(newTodo)
      .subscribe((todo) => this.todos.push(todo));
    this.todoParam = {
      todo: {
        text: '',
        reminder: true,
      },
    };
  }

  // edit todo
  editTodo(todo: Todo) {
    this.todoParam.todo = todo;
  }

  // save tdo
  saveTodo(todo: Todo) {
    this.todoService.updateTodoReminder(todo).subscribe();
    this.todoParam.todo = {
      text: '',
      reminder: true,
    };
  }

  // delete
  deleteTodo(todo: Todo) {
    this.todoService
      .deleteTodo(todo)
      .subscribe(
        () => (this.todos = this.todos.filter((t) => t.id !== todo.id))
      );
  }

  // clear all todo
  clearTodos(): Todo[] {
    const clear = this.todos.forEach((todo) => this.deleteTodo(todo));
    return this.todos;
  }

  // set reminder from modal
  onSetReminder(todo: Todo) {
    todo.reminder = !todo.reminder;
  }
}
