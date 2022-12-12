import { Component, OnInit } from '@angular/core';
import { Order, OrderService, ORDER_STATUS } from '@eshop/order';
import { UserService } from '@eshop/user-auth';

@Component({
  selector: 'eshop-order',
  templateUrl: './order.component.html',
})
export class OrderComponent implements OnInit {
  orders: Order[] = [];
  currentStatus: number = 0;
  isRefreshing: boolean = false;
  orderId: string = '';

  constructor(
    private service: OrderService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this._fetchData({ status: this.currentStatus });
  }

  readStatus(key: string): any {
    return Object(ORDER_STATUS)[key];
  }

  onOrderRefresh() {
    this.isRefreshing = true;
    this._fetchData({ status: this.currentStatus });
  }

  onSearchOrder() {
    this.currentStatus = -1;
    this._fetchData({ status: this.currentStatus, orderId: this.orderId });
  }

  onListOrderByStatus(status: number) {
    this.currentStatus = status;
    this._fetchData({ status: status });
  }

  private _fetchData(model: { status?: number; orderId?: string }) {
    this.userService._currentUser().subscribe((user: any) => {
      if (user) {
        this.service
          .getUserOrders({
            userId: user._id,
            status: model.status,
            orderId: model.orderId,
          })
          .subscribe((res: any) => {
            if (res) {
              this.isRefreshing = false;
              this.orders = res.result;
            }
          });
      }
    });
  }
}
