import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoComponent } from './todo.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoComponent],
      schemas: [NO_ERRORS_SCHEMA], // ignore child components or directives
    }).compileComponents();

    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the TodoComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should add a new todo', () => {
    component.newTodo = 'Test Jest Todo';
    component.addTodo();
    expect(component.todos.length).toBeGreaterThan(0);
    expect(component.todos[0].text).toBe('Test Jest Todo');
  });

  it('should delete a todo', () => {
    component.addTodo('To be deleted');
    const id = component.todos[0].id;
    component.deleteTodo(id);
    expect(component.todos.length).toBe(0);
  });
});
