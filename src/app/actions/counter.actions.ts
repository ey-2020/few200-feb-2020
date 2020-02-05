import { createAction, props } from '@ngrx/store';

export const countIncremented = createAction(
  '[app counter] count incremented'
);

export const countDecremented = createAction(
  '[app counter] count decremented'
);

export const countReset = createAction(
  '[app counter] count reset'
);

export const countBySet = createAction(
  '[app counter] count by set',
  props<{ by: number }>()
);

export const currentSet = createAction(
  '[app counter] current set',
  props<{ current: number }>()
);

