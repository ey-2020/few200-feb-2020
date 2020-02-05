import { Component } from '@angular/core';
import { applicationStarted } from './actions/app.actions';
import { Store } from '@ngrx/store';
import { AppState } from './reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Front End Web 200';
  by = 'Jeff Gonzalez';

  constructor(store: Store<AppState>) {
    store.dispatch(applicationStarted());
  }
}
