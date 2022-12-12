import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User, UserService } from '@eshop/user-auth';
import { MenuItem, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'eshop-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  items = [] as MenuItem[];
  isUserLogin: boolean = false;
  userSub = {} as Subscription;

  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.userSub = this.authService.isUserLogin.subscribe((flag: boolean) => {
      this.isUserLogin = flag;
    });

    this.userService._currentUser().subscribe((user: User) => {
      if (user) {
        this.isUserLogin = true;
        this.items = [
          {
            label: 'Dashboard',
            icon: 'pi pi-home',
            command: () => {
              this.router.navigate(['/user/dashboard']);
            },
          },
          {
            label: 'Orders',
            icon: 'pi pi-box',
            command: () => {
              this.router.navigate(['/user/orders']);
            },
          },
          {
            label: 'Setting',
            icon: 'pi pi-sliders-h',
            command: () => {
              this.router.navigate(['/user/setting']);
            },
          },
          {
            label: '<strong>Logout</strong>',
            icon: 'pi pi-sign-out',
            escape: false,
            command: () => {
              this.authService.logout();
              this.userService.initAppSession();
              this.messageService.add({
                key: 'bc',
                severity: 'success',
                summary: 'User Logout',
                detail: 'Logout successfully',
              });
              this.router.navigate(['/']);
            },
          },
        ];
      }
    });
  }
}
