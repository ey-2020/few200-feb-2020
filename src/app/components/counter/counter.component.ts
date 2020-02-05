import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppState, selectCurrentCount, selectCountAtStart, selectCountStepper } from 'src/app/reducers';
import { Store } from '@ngrx/store';

import * as actions from '../../actions/counter.actions';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit {

  // current = 0;
  current$: Observable<number>;
  atStart$: Observable<boolean>;
  stepper$: Observable<number>;
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.current$ = this.store.select(selectCurrentCount);
    this.atStart$ = this.store.select(selectCountAtStart);
    this.stepper$ = this.store.select(selectCountStepper);
    // this.current$ =
    //   this.store.select(s => s.counter.current);
    // this.atStart$ =
    //   this.store.select(s => s.counter.current === 0);
  }

  increment() {
    this.store.dispatch(actions.countIncremented());
  }

  decrement() {
    this.store.dispatch(actions.countDecremented());
  }

  reset() {
    this.store.dispatch(actions.countReset());
  }

  setCountBy(by: number) {
    this.store.dispatch(actions.countBySet({ by }));
  }

  /*
  increment() {
    this.store.dispatch({ type: 'increment' });
  }

  decrement() {
    this.store.dispatch({ type: 'decrement' });
  }

  reset() {
    this.store.dispatch({ type: 'reset' });
  }

  increment() {
    this.current += 1;
  }

  decrement() {
    this.current -= 1;
  }
  */

}
