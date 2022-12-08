import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@eshop/user-auth';
import { Subscription } from 'rxjs';

@Component({
  selector: 'eshop-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'eshop';
  currentRoute: any;
  routeSub = {} as Subscription;
  userSub = {} as Subscription;
  constructor(private route: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.userService.initAppSession();
    this.routeSub = this.route.events.subscribe((e: any) => {
      const urlRes = e.url;
      if (urlRes) {
        this.currentRoute = urlRes;
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }
}
