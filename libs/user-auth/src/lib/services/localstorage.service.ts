import { Injectable } from '@angular/core';
const TOKEN_NAME = 'jwtToken';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  setToken(token: string) {
    localStorage.setItem(TOKEN_NAME, token);
  }

  removeToken() {
    localStorage.removeItem(TOKEN_NAME);
  }

  getToken() {
    return localStorage.getItem(TOKEN_NAME);
  }
}
