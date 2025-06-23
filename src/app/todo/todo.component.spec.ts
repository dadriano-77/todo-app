import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { TodoComponent } from './todo.component';

describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoComponent],
      imports: [FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a todo item', () => {
    component.newTodo = 'Test Todo';
    component.addTodo();
    expect(component.todos.length).toBe(1);
    expect(component.todos[0].text).toBe('Test Todo');
  });

  it('should filter completed todos', () => {
    component.todos = [
      { id: 1, text: 'Done', completed: true, createdAt: new Date() },
      { id: 2, text: 'Active', completed: false, createdAt: new Date() },
    ];
    component.currentFilter = 'completed';
    expect(component.getFilteredTodos().length).toBe(1);
  });
});
