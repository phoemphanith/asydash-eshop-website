import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User, UserService } from '@eshop/user-auth';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'eshop-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  items = [] as MenuItem[];
  isUserLogin: boolean = false;
  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.userService._currentUser().subscribe((user: User) => {
      if (user) {
        this.isUserLogin = true;
        this.items = [
          {
            label: 'Dashboard',
            icon: 'pi pi-home',
            command: () => {
              this.router.navigate(['/dashboard']);
            },
          },
          {
            label: 'Orders',
            icon: 'pi pi-box',
            command: () => {
              this.router.navigate(['/orders']);
            },
          },
          {
            label: 'Setting',
            icon: 'pi pi-sliders-h',
            command: () => {
              this.router.navigate(['/setting']);
            },
          },
          {
            label: '<strong>Logout</strong>',
            icon: 'pi pi-sign-out',
            escape: false,
            command: () => {
              this.isUserLogin = false;
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
