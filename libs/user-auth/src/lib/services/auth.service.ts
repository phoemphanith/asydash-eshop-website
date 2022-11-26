import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable, Subject } from 'rxjs';
import { Auth } from '../models/auth.model';
import { LocalStorageService } from './localstorage.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl + '/users';
  authSubject = new Subject<Auth>();
  constructor(private http: HttpClient, private local: LocalStorageService) {}

  onLogin(form: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, form);
  }

  logout() {
    this.local.removeToken();
  }
}
