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

  isValidToken(): boolean {
    const token = this.getToken();
    if (token) {
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));
      return tokenDecode && this.isTokenExpired(tokenDecode.exp);
    }
    return false;
  }

  getUserIdFromToken(): string | null {
    const token = this.getToken();
    if (token) {
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));
      if (tokenDecode) {
        return tokenDecode.userId;
      }
      return null;
    }
    return null;
  }

  isTokenExpired(expiredDate: number) {
    return Math.floor(new Date().getTime() / 1000) <= expiredDate;
  }
}
