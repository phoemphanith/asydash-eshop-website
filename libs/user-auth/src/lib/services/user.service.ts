import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { UsersFacade } from '../state/users.facade';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = environment.apiUrl + '/users';
  constructor(private http: HttpClient, private usersFacade: UsersFacade) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUser(itemId: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${itemId}`);
  }

  createUser(data: User): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  updateUser(data: User): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${data.id}`, data);
  }

  deleteUser(itemId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${itemId}`);
  }

  initAppSession() {
    this.usersFacade.buildUserSession();
  }

  _currentUser() {
    return this.usersFacade.currentUser$;
  }

  _isUserAuth() {
    return this.usersFacade.isAuthenticated$;
  }
}
