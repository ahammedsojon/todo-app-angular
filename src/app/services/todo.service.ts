import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Todo } from '../Todo';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiURL = 'http://localhost:5000/todos';
  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiURL);
  }

  deleteTodo(todo: Todo): Observable<Todo> {
    console.log(todo);
    const url = `${this.apiURL}/${todo.id}`;
    return this.http.delete<Todo>(url, httpOptions);
  }

  updateTodoReminder(todo: Todo): Observable<Todo> {
    const url = `${this.apiURL}/${todo.id}`;
    return this.http.put<Todo>(url, todo, httpOptions);
  }

  addNewTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.apiURL, todo, httpOptions);
  }
}
