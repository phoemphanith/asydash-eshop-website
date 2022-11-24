import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ORDER_STATUS, OrderService } from '@eshop/order';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'eshop-admin-order-detail',
  templateUrl: './order-detail.component.html',
})
export class OrderDetailComponent implements OnInit {
  currentId: string = '';
  orderObj: any;
  isLoading: boolean = true;

  constructor(
    private service: OrderService,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this._fetchOrder();
  }

  readStatus(key: number): any {
    return Object(ORDER_STATUS)[key];
  }

  onChangeStatus(status: number) {
    this.isLoading = true;
    this.service
      .updateOrderStatus({ status: `${status}` }, this.currentId)
      .subscribe(
        () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Update Order',
            detail: 'Order save successfully',
          });
          this._fetchOrder();
        },
        (err) => {
          this.messageService.add({
            severity: 'error',
            summary: `(${err.status}) ${err.statusText}`,
            detail: "Can't update order",
          });
        }
      );
  }

  private _fetchOrder() {
    this.route.params.subscribe((param: any) => {
      if (param.id) {
        this.currentId = param.id;
        this.service.getOrder(param.id).subscribe((res: any) => {
          this.orderObj = res.result;
          this.isLoading = false;
        });
      }
    });
  }
}
