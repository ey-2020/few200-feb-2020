import { TodoItem } from './todo-list/models';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { TodoDashbaordSummary } from '../models';
import { map } from 'rxjs/operators';


export class TodoService {

  private items: TodoItem[] = [
    { description: 'Shovel Snow', completed: false },
    { description: 'Stake Driveway', completed: false }
  ];

  private itemsSubject = new BehaviorSubject<TodoItem[]>(this.items);
  // 1. Allows you to get the list of todos.

  getTodoItems() {
    return this.itemsSubject.asObservable();
  }
  // 2. Allows you to add a todo.

  addTodoItem(description: string) {
    this.items = [{ description, completed: false }, ...this.items];
    this.itemsSubject.next(this.items);
  }
  // 3. Lets you get a summary for the dashboard.

  getDashboardSummary(): Observable<TodoDashbaordSummary> {
    return this.itemsSubject.pipe(
      map(todos => {
        return {
          totalTodos: todos.length,
          incompleteTodos: todos.filter(t => t.completed === false).length,
          completeTodos: todos.filter(t => t.completed).length
        } as TodoDashbaordSummary;
      })
    );
  }
  // 4. Lets you mark one as complete.
}
