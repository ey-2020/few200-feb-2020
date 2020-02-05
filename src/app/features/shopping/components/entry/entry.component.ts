import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ShoppingState } from '../../reducers';
import { shoppingItemAdded } from '../../actions/list.actions';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent implements OnInit {

  constructor(private store: Store<ShoppingState>) { }

  ngOnInit() {
  }

  addItem(descriptionEl: HTMLInputElement) {
    // todo: Dispatch an action
    const description = descriptionEl.value;
    this.store.dispatch(shoppingItemAdded({ description }));
    descriptionEl.value = '';
    descriptionEl.focus();
  }
}
