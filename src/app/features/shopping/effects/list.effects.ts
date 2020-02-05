import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';

import * as appActions from '../../../actions/app.actions';
import * as listActions from '../actions/list.actions';
import { switchMap, map } from 'rxjs/operators';
import { ShoppingItemEntity } from '../reducers/list.reducer';

@Injectable()
export class ListEffects {

  // shoppingItemAdded -> shoppingItemAddedSuccessfully | shoppingItemAddedFailure
  // failure on 300
  // shoppingItemAdded => ShoppingItemAddedSuccessfully | shoppingItemAddedFailure
  saveShoppingItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(listActions.shoppingItemAdded),
      switchMap(originalAction => this.http.post<ShoppingItemEntity>('http://localhost:3000/shopping',
        { description: originalAction.payload.description })
        .pipe(
          map(r => listActions.shoppingItemAddedSuccessfully({ oldId: originalAction.payload.id, payload: r }))
        )
      )
    ), { dispatch: true }
  );

  // applicationStarted -> shoppingListLoaded
  loadListData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(appActions.applicationStarted),
      switchMap(() => this.http.get<{ data: ShoppingItemEntity[] }>('http://localhost:3000/shopping')
        .pipe(
          map(r => r.data),
          map(payload => listActions.shoppingListLoaded({ payload }))
        )

      )
    ), { dispatch: true }
  );

  constructor(private actions$: Actions, private http: HttpClient) { }
}
