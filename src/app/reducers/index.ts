import { createSelector } from '@ngrx/store';

import * as fromCounter from './counter.reducer';
export interface AppState {
  counter: fromCounter.CounterState;
}

export const reducers = {
  counter: fromCounter.reducer
};

const selectCounterBranch = (state: AppState) => state.counter;

export const selectCountStepper =
  createSelector(selectCounterBranch, b => b.by);
export const selectCurrentCount =
  createSelector(selectCounterBranch, b => b.current);
export const selectCountAtStart = createSelector(
  selectCurrentCount,
  selectCountStepper,
  (count, by) => count - by < 0
);

/*
export const selectCountStepper =
  (state: AppState) => state.counter.by;
export const selectCurrentCount =
  (state: AppState) => state.counter.current;
export const selectCountAtStart =
  (state: AppState) => state.counter.current === 0;
*/
