import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  USER_FEATURE_KEY,
  UsersPartialState,
  UserState,
} from './users.reducer';

export const getUsersState = createFeatureSelector<
  UsersPartialState | any,
  UserState | any
>(USER_FEATURE_KEY);
export const getUser = createSelector(getUsersState, (state) => state.user);
export const getUserIsAuthenticated = createSelector(
  getUsersState,
  (state) => state.isAuthenticated
);
