import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { ShoppingItemModel } from '../../models';
import { ShoppingState } from '../../reducers';
import { Store } from '@ngrx/store';
import { ShoppingItemEntity } from '../../reducers/list.reducer';
import { shoppingItemPurchased } from '../../actions/list.actions';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  // only when change, compare with virtual DOM
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit {

  // model: ShoppingItemModel[] = [
  //   { id: '1', description: 'Beer' },
  //   { id: '2', description: 'More Beer' },
  // ];

  // from parent; watch only this variable
  @Input() model: ShoppingItemModel[];
  constructor(private store: Store<ShoppingState>) { }

  ngOnInit() {
  }

  markPurchased(item: ShoppingItemEntity) {
    this.store.dispatch(shoppingItemPurchased({ payload: item }));
  }

}
