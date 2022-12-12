import { Component, OnInit } from '@angular/core';
import { DashboardService } from '@eshop/ui';
import { User, UserService } from '@eshop/user-auth';
import { Subscription } from 'rxjs';

@Component({
  selector: 'eshop-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  model: any;
  userSub: Subscription = new Subscription();
  constructor(
    private service: DashboardService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userSub = this.userService._currentUser().subscribe((user: any) => {
      if (user) {
        this.service.getUserOrderCount(user._id).subscribe((res: any) => {
          if (res) {
            this.model = res.result;
          }
        });
      }
    });
  }
}
