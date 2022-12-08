import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as usersSelector from './users.selectors';
import * as usersAction from './users.actions';

@Injectable()
export class UsersFacade {
  currentUser$ = this.store.pipe(select(usersSelector.getUser));
  isAuthenticated$ = this.store.pipe(
    select(usersSelector.getUserIsAuthenticated)
  );

  constructor(private store: Store) {}

  buildUserSession() {
    this.store.dispatch(usersAction.buildUsersSession());
  }
}
