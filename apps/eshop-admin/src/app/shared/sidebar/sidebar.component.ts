import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AuthService,
  LocalStorageService,
  UserService,
} from '@eshop/user-auth';
import { ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'eshop-admin-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit, OnDestroy {
  username: string = '';
  email: string = '';
  authSubscription: Subscription | undefined;
  constructor(
    private auth: AuthService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private userService: UserService,
    private local: LocalStorageService
  ) {}

  ngOnInit(): void {
    this._fetchUser();
    this.authSubscription = this.auth.authSubject.subscribe((auth) => {
      this.username = auth.name;
      this.email = auth.email;
    });
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
  }

  private _fetchUser() {
    const token = this.local.getToken();
    if (token) {
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));
      this.userService.getUser(tokenDecode.userId).subscribe((res: any) => {
        this.username = res.result.name;
        this.email = res.result.email;
      });
      this.auth.authSubject.next({
        id: tokenDecode.userId,
        name: this.username,
        email: this.email,
      });
    }
  }

  onLogout() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to logout',
      header: 'Logout Confirmation',
      icon: 'pi pi-bell',
      accept: () => {
        this.auth.logout();
        this.router.navigate(['/login']);
      },
    });
  }
}
