import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User, UserService } from '@eshop/user-auth';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'eshop-layout',
  templateUrl: './layout.component.html',
})
export class LayoutComponent implements OnInit, OnDestroy {
  user: User | any;
  userSub: Subscription = new Subscription();

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userSub = this.userService._currentUser().subscribe((user: User) => {
      if (user) {
        this.user = user;
      }
    });
  }

  signOut() {
    this.authService.logout();
    this.userService.initAppSession();
    this.messageService.add({
      key: 'bc',
      severity: 'success',
      summary: 'User Logout',
      detail: 'Logout successfully',
    });
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
