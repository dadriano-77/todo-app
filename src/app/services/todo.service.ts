import { Injectable } from '@angular/core';

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: Date;
}

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todos: Todo[] = [];
  private nextId = 1;

  getAllTodos(): Todo[] {
    return this.todos;
  }

  addTodo(text: string): Todo {
    const todo: Todo = {
      id: this.nextId++,
      text,
      completed: false,
      createdAt: new Date(),
    };
    this.todos.push(todo);
    return todo;
  }

  deleteTodo(id: number): Todo | null {
    const index = this.todos.findIndex((t) => t.id === id);
    if (index !== -1) {
      return this.todos.splice(index, 1)[0];
    }
    return null;
  }

  toggleTodo(todo: Todo): Todo {
    todo.completed = !todo.completed;
    return todo;
  }

  getStats() {
    const total = this.todos.length;
    const completed = this.todos.filter((t) => t.completed).length;
    const active = total - completed;

    return {
      total,
      completed,
      active,
      completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
    };
  }
}
