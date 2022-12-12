import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '@eshop/order';

@Component({
  selector: 'eshop-order-detail',
  templateUrl: './order-detail.component.html',
})
export class OrderDetailComponent implements OnInit {
  order = {} as any;
  tax = 0.15;

  constructor(
    private orderService: OrderService,
    private routes: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.routes.params.subscribe((param: any) => {
      if (param) {
        this.orderService.getOrder(param.id).subscribe((res: any) => {
          if (res) {
            this.order = res.result;
          }
        });
      }
    });
  }

  get TotalPrice() {
    if (this.order.orderItems && this.order.orderItems.length > 0) {
      return this.order.orderItems.reduce(
        (sum: number, item: any) =>
          sum + Math.round(item.product.price * item.quantity),
        0
      );
    }
    return 0;
  }
}
