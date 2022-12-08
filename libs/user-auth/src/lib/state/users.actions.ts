import { createAction, props } from '@ngrx/store';
import { User } from '../models/user.model';

export const buildUsersSession = createAction('[Users] Build Users Session');
export const buildUsersSessionSuccess = createAction(
  '[Users] Build Users Session Success',
  props<{ user: User }>()
);
export const buildUsersSessionFailed = createAction(
  '[Users] Build User Session Failed'
);
