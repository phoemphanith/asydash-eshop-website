import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { concatMap, of, map, catchError } from 'rxjs';
import { LocalStorageService } from '../services/localstorage.service';
import { UserService } from '../services/user.service';
import * as userActions from './users.actions';

@Injectable()
export class UsersEffects {
  buildUserSession = createEffect(() => {
    return this.action$.pipe(
      ofType(userActions.buildUsersSession),
      concatMap(() => {
        const userId = this.local.getUserIdFromToken();
        if (!this.local.isValidToken || !userId) {
          return of(userActions.buildUsersSessionFailed());
        }

        return this.userService.getUser(userId).pipe(
          map((res: any) => {
            return userActions.buildUsersSessionSuccess({ user: res.result });
          }),
          catchError(() => {
            return of(userActions.buildUsersSessionFailed());
          })
        );
      })
    );
  });

  constructor(
    private action$: Actions,
    private local: LocalStorageService,
    private userService: UserService
  ) {}
}
