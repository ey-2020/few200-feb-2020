import { Component, OnInit } from '@angular/core';
import { ShoppingState, selectShoppingItemModel } from './reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ShoppingItemModel } from './models';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit {

  list$: Observable<ShoppingItemModel[]>;
  constructor(private store: Store<ShoppingState>) { }

  ngOnInit() {
    this.list$ = this.store.select(selectShoppingItemModel);
  }

}
