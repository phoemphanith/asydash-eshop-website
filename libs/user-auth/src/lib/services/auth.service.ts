import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable, Subject } from 'rxjs';
import { Auth } from '../models/auth.model';
import { LocalStorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl + '/users';
  authSubject = new Subject<Auth>();
  constructor(private http: HttpClient, private local: LocalStorageService) {}
  isUserLogin = new Subject<boolean>();

  onLogin(form: any): Observable<any> {
    this.isUserLogin.next(true);
    return this.http.post<any>(`${this.apiUrl}/login`, form);
  }

  onRegister(form: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, form);
  }

  logout() {
    this.local.removeToken();
    this.isUserLogin.next(false);
  }
}
