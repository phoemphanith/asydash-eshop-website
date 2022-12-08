import { createReducer, on, Action } from '@ngrx/store';
import { User } from '../models/user.model';
import * as userAction from './users.actions';

export const USER_FEATURE_KEY = 'users';

export interface UserState {
  user: User | null;
  isAuthenticated: boolean;
}

export interface UsersPartialState {
  readonly [USER_FEATURE_KEY]: UserState;
}

export const initialUsersState: UserState = {
  user: null,
  isAuthenticated: false,
};

export const reducer = createReducer(
  initialUsersState,
  on(userAction.buildUsersSession, (state) => {
    return { ...state };
  }),
  on(userAction.buildUsersSessionSuccess, (state, payload) => {
    return { ...state, user: payload.user, isAuthenticated: true };
  }),
  on(userAction.buildUsersSessionFailed, (state) => {
    return { ...state, user: null, isAuthenticated: false };
  })
);

export function userReducer(state: UserState | undefined, payload: Action) {
  return reducer(state, payload);
}
