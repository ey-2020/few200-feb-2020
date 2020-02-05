import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { tap, map, filter } from 'rxjs/operators';
import * as counterActions from '../actions/counter.actions';
import { applicationStarted } from '../actions/app.actions';
import { AppState, selectCurrentCount } from '../reducers';
import { Store } from '@ngrx/store';

@Injectable()
export class CounterEffects {

  readCountfromLocalStorate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(applicationStarted),
      map(() => localStorage.getItem('by')), // -> '5' | null
      filter(by => by !== null),
      map(by => parseInt(by, 10)),
      map(by => counterActions.countBySet({ by }))
    ), // { dispatch: true }
  );

  readCurrentfromLocalStorate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(applicationStarted),
      map(() => localStorage.getItem('current')), // -> '5' | null
      filter(current => current !== null),
      map(current => parseInt(current, 10)),
      map(current => counterActions.currentSet({ current }))
    ), { dispatch: true }
  );

  writeCountToLocalStorage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(counterActions.countBySet),
      tap(a => localStorage.setItem('by', a.by.toString()))
    ), { dispatch: false }
  );

  writeCurrentToLocalStorage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(counterActions.countDecremented,
        counterActions.countIncremented,
        counterActions.countReset),
      tap(() => localStorage.setItem('current', this.current.toString()))
    ), { dispatch: false }
  );

  logActions$ = createEffect(() =>
    this.actions$.pipe(
      tap(a => console.log(`Got an action of type ${a.type}`))
    ), { dispatch: false }
  );

  current: number;
  constructor(private actions$: Actions, private store: Store<AppState>) {
    store.select(selectCurrentCount).subscribe(c => this.current = c);
  }

  // 1. If you are in a feature module, create a feature selector

  // 2. Create a selector for each "branch" of the state.

  // 3. Any helpers?

  // 4. What you need for the components

  /*
      writeCountToLocalStorage$ = createEffect(() =>
        this.actions$.pipe(
          ofType(counterActions.countBySet),
          tap(a => localStorage.setItem('by', a.by.toString()))
        ), { dispatch: false }
      );

      logActions$ = createEffect(() =>
        this.logActions$.pipe(
          tap(a => console.log(`Got an action of type {a.type}`))
        ), { dispatch: false }
      );

      constructor(private actions$: Actions) { }
    */
}
