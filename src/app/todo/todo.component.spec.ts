import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoComponent } from './todo.component';
import { FormsModule } from '@angular/forms';
import { UpgradeModule } from '@angular/upgrade/static';

describe('TodoComponent with UpgradeModule mocks', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;

  const mockTodoService = {
    addTodo: jest.fn((text: string) => ({
      id: Math.floor(Math.random() * 1000),
      text,
      completed: false,
      createdAt: new Date(),
    })),
    getAllTodos: jest.fn().mockReturnValue([]),
  };

  const mockNotificationService = {
    getNotifications: jest.fn().mockReturnValue({
      show: false,
      type: '',
      message: '',
    }),
    show: jest.fn(),
  };

  const mockStorageService = {
    get: jest.fn(),
    set: jest.fn(),
  };

  const mockUpgradeModule = {
    $injector: {
      get: (serviceName: string) => {
        switch (serviceName) {
          case 'TodoService':
            return mockTodoService;
          case 'NotificationService':
            return mockNotificationService;
          case 'StorageService':
            return mockStorageService;
          default:
            return undefined;
        }
      },
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoComponent],
      imports: [FormsModule],
      providers: [{ provide: UpgradeModule, useValue: mockUpgradeModule }],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // --- ADD TODO TESTS ---
  it('should add 3 todos and reset newTodo input', () => {
    const todosToAdd = ['First Task', 'Second Task', 'Third Task'];

    todosToAdd.forEach((task, index) => {
      component.newTodo = task;
      component.addTodo();
      expect(mockTodoService.addTodo).toHaveBeenCalledWith(task);
      expect(component.todos.length).toBe(index + 1);
      expect(component.todos[index].text).toBe(task);
      expect(component.newTodo).toBe('');
    });
  });

  // --- DELETE TODO TEST ---
  it('should delete a todo', () => {
    const todo = {
      id: 1,
      text: 'Delete me',
      completed: false,
      createdAt: new Date(),
    };
    component.todos = [todo];

    component.deleteTodo(1);
    expect(component.todos.length).toBe(0);
    expect(mockNotificationService.show).toHaveBeenCalled();
  });

  // --- TOGGLE TODO TEST ---
  it('should toggle a todo completed state', () => {
    const todo = {
      id: 1,
      text: 'Toggle me',
      completed: false,
      createdAt: new Date(),
    };
    component.todos = [todo];

    component.toggleTodo(todo);
    expect(todo.completed).toBe(true);

    component.toggleTodo(todo);
    expect(todo.completed).toBe(false);
  });

  // --- SUGGESTED BEHAVIOR TESTS ---
  it('should get filtered todos correctly', () => {
    component.todos = [
      { id: 1, text: 'A', completed: true, createdAt: new Date() },
      { id: 2, text: 'B', completed: false, createdAt: new Date() },
    ];

    component.setFilter('completed');
    expect(component.getFilteredTodos().length).toBe(1);

    component.setFilter('active');
    expect(component.getFilteredTodos().length).toBe(1);

    component.setFilter('all');
    expect(component.getFilteredTodos().length).toBe(2);
  });

  it('should calculate correct completion rate', () => {
    component.todos = [
      { id: 1, text: 'A', completed: true, createdAt: new Date() },
      { id: 2, text: 'B', completed: false, createdAt: new Date() },
      { id: 3, text: 'C', completed: true, createdAt: new Date() },
    ];

    const rate = component.getCompletionRate();
    expect(rate).toBe(67); // 2 of 3 = 66.66 rounded
  });
});
