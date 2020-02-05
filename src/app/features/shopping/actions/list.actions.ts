import { createAction, props } from '@ngrx/store';
import { ShoppingItemEntity } from '../reducers/list.reducer';

let currentId = 99;

export const shoppingItemAdded = createAction(
  '[shopping list] add item',
  ({ description }: { description: string }) => ({
    payload: {
      description,
      id: 'T' + currentId++,
      purchased: false
    }
  })
);

export const shoppingItemAddedSuccessfully = createAction(
  '[shopping list] shopping item added successfully',
  props<{ oldId: string, payload: ShoppingItemEntity }>()
);

export const shoppingItemPurchased = createAction(
  '[shopping list] shopping item purchased',
  props<{ payload: ShoppingItemEntity }>()
);

export const shoppingListLoaded = createAction(
  '[shopping list] shopping item loaded',
  props<{ payload: ShoppingItemEntity[] }>()
);
