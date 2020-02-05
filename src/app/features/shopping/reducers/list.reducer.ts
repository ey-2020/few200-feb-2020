import { EntityState, createEntityAdapter } from '@ngrx/entity';
// import { createReducer, Action } from '@ngrx/store';
import { createReducer, Action, on } from '@ngrx/store';
// new line
import * as listActions from '../actions/list.actions';

export interface ShoppingItemEntity {
  id: string;
  description: string;
  purchased: boolean;
}

export interface ListState extends EntityState<ShoppingItemEntity> {

}

export const adapter = createEntityAdapter<ShoppingItemEntity>();

const initialState = adapter.getInitialState();
// const initialState: ListState = {
//   ids: ['1', '2'],
//   entities: {
//     1: { id: '1', description: 'Shampoo', purchased: false },
//     2: { id: '2', description: 'Bread', purchased: true }
//   }
// };

const reducerFunction = createReducer(
  initialState,
  // need id, reducer ignores, sends to server, server returns
  on(listActions.shoppingItemAdded, (s, a) => adapter.addOne(a.payload, s)),
  on(listActions.shoppingItemPurchased, (s, a) => adapter.updateOne({ id: a.payload.id, changes: { purchased: true } }, s)),
  on(listActions.shoppingListLoaded, (s, a) => adapter.addAll(a.payload, s)),
  // won't use on high failure api requests
  on(listActions.shoppingItemAddedSuccessfully, (s, a) => {
    const tempState = adapter.removeOne(a.oldId, s);
    return adapter.addOne(a.payload, tempState);
  })
);

export function reducer(state: ListState = initialState, action: Action) {
  return reducerFunction(state, action);
}

