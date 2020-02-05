import { Component, OnInit } from '@angular/core';
import { TodoDashbaordSummary } from '../models';
import { Observable } from 'rxjs';
import { TodoService } from '../communications/todo.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  model$: Observable<TodoDashbaordSummary>; /* TodoDashbaordSummary = {
    totalTodos: 82,
    completeTodos: 2,
    incompleteTodos: 80
  }; */
  constructor(private service: TodoService) { }

  ngOnInit() {
    this.model$ = this.service.getDashboardSummary();
  }

}
