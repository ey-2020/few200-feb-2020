import { Action, createReducer, on } from '@ngrx/store';
import * as actions from '../actions/counter.actions';

export interface CounterState {
  current: number;
  by: number;
}

export const initialState: CounterState = {
  current: 0,
  by: 1
};

// export function reducer(state: CounterState = initialState, action: Action) {
//   return state;
// }

const myReducer = createReducer(
  initialState,
  on(actions.countReset, () => initialState),
  // on(actions.countIncremented, (s) => ({ current: s.current + 1 })),
  // on(actions.countDecremented, (s) => ({ current: s.current - 1 })),
  on(actions.countIncremented, (s) => ({ ...s, current: s.current + s.by })),
  on(actions.countDecremented, (s) => ({ ...s, current: s.current - s.by })),
  on(actions.countBySet, (s, a) => ({ ...s, by: a.by })),
  on(actions.currentSet, (s, a) => ({ ...s, current: a.current })),
);

export function reducer(state: CounterState = initialState, action: Action) {
  return myReducer(state, action);
}

// export function reducer(state: CounterState = initialState, action: Action) {
//   switch (action.type) {
//     case 'reset': {
//       return initialState;
//     }
//     case 'increment': {
//       return {
//         current: state.current + 1
//       };
//     }
//     case 'decrement': {
//       return {
//         current: state.current - 1
//       };
//     }
//     default: {
//       return state;
//     }
//   }
// }
