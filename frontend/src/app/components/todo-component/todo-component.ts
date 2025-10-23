import { Component } from '@angular/core';
import { TodoModel } from '../../models/todo.model';
import { TodoService } from '../../services/todo';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-todo-component',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './todo-component.html',
  styleUrl: './todo-component.css'
})
export class TodoComponent {
  todos: TodoModel[] = [];
  newTask: string = '';
  errorMessage: string = '';

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.getTodos().subscribe({
      next: (todos) => {
        console.log('Processed Todos:', todos); // Debug log
        this.todos = todos;
        this.errorMessage = '';
      },
      error: (err) => {
        console.error('API Error:', err);
        this.errorMessage = 'Failed to load tasks: ' + err.message;
        this.todos = [];
      }
    });
  }

  addTodo() {
    if (this.newTask.trim()) {
      const newTodo: TodoModel = { task: this.newTask, completed: false };
      this.todoService.addTodo(newTodo).subscribe({
        next: (todo) => {
          this.todos.unshift(todo);
          this.newTask = '';
          this.errorMessage = '';
        },
        error: (err) => {
          this.errorMessage = 'Failed to add task: ' + err.message;
        }
      });
    }
  }

  toggleComplete(todo: TodoModel) {
    todo.completed = !todo.completed;
    this.todoService.updateTodo(todo).subscribe({
      error: (err) => {
        this.errorMessage = 'Failed to update task: ' + err.message;
      }
    });
  }

  deleteTodo(id: number | undefined) {
    if (id !== undefined) {
      this.todoService.deleteTodo(id).subscribe({
        next: () => {
          this.todos = this.todos.filter(t => t.id !== id);
          this.errorMessage = '';
        },
        error: (err) => {
          this.errorMessage = 'Failed to delete task: ' + err.message;
        }
      });
    }
  }
}
