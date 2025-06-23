import { Component, Inject, OnInit, Optional } from '@angular/core';
import { UpgradeModule } from '@angular/upgrade/static';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: Date;
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  todos: any[] = [];
  newTodo = '';
  currentFilter = 'all';
  notification = {
    show: false,
    type: '',
    message: '',
  };
  nextId = 1;

  private todoService: any;
  private notificationService: any;
  private storageService: any;
  constructor(@Optional() private upgrade: UpgradeModule) {}
  ngOnInit(): void {
    setTimeout(() => {
      if (this.upgrade) {
        this.todoService = this.upgrade.$injector.get('TodoService');
        this.notificationService = this.upgrade.$injector.get(
          'NotificationService'
        );
        this.storageService = this.upgrade.$injector.get('StorageService');

        this.todos = this.todoService.getAllTodos();
        this.notification = this.notificationService.getNotification();
        const savedFilter = this.storageService.get('todoFilter');
        if (savedFilter) {
          this.currentFilter = savedFilter;
        }
        this.todoService.addTodo('Learn AngularJS');
        this.todoService.addTodo('Build a TodoApp Hybrid');
        this.todoService.addTodo('Master $scope an services');
        this.todos = this.todoService.getAllTodos();
        this.todos[0].completed = true;
        this.showNotification('Welcome to your Todo App Hybrid!', 'success');
      }
    }, 0);
  }

  addTodo(text?: string): void {
    const content = text || this.newTodo.trim();
    if (!content) return;
    this.todoService.addTodo(content);
    if (!text) this.newTodo = '';
    this.showNotification('Todo added successfully!', 'success');
  }

  deleteTodo(id: number): void {
    const index = this.todos.findIndex((t) => t.id === id);
    console.log('deleted on cost before if');
    if (index >= 0) {
      const deleted = this.todos.splice(index, 1)[0];
      this.showNotification(`Todo deleted: ${deleted.text}`, 'success');
    }
  }

  toggleTodo(todo: any): void {
    todo.completed = this.todoService.toggleTodo;
    console.log(todo.completed);
    const msg = todo.completed ? 'Todo completed!' : 'Todo marked as active!';
    this.showNotification(msg, 'success');
  }

  setFilter(filter: string): void {
    this.currentFilter = filter;
  }

  getFilteredTodos(): Todo[] {
    switch (this.currentFilter) {
      case 'active':
        return this.todos.filter((todo) => !todo.completed);
      case 'completed':
        return this.todos.filter((todo) => todo.completed);
      default:
        return this.todos;
    }
  }

  getTotalCount(): number {
    return this.todos.length;
  }

  getActiveCount(): number {
    return this.todos.filter((t) => !t.completed).length;
  }

  getCompletedCount(): number {
    return this.todos.filter((t) => t.completed).length;
  }

  getCompletionRate(): number {
    const total = this.getTotalCount();
    const completed = this.getCompletedCount();
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  }

  showNotification(message: string, type: 'success' | 'error'): void {
    this.notificationService.show(message, type);
  }

  trackById(index: number, todo: any): any {
    return todo.id;
  }
}
