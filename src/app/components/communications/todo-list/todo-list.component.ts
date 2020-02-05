import { Component, OnInit, Input } from '@angular/core';
import { TodoItem } from './models';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  @Input() list: TodoItem[] = [];
  // header = 'my todo list';
  @Input() header = 'my todo list';
  constructor() { }

  ngOnInit() {
  }

  markComplete(item: TodoItem) {
    item.completed = true;
  }
}
