import { Component } from '@angular/core';
import { Order, OrderService, ORDER_STATUS } from '@eshop/order';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'eshop-admin-order-list',
  templateUrl: './order-list.component.html',
})
export class OrderListComponent {
  orders: Order[] = [];
  constructor(
    private service: OrderService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this._fetchData();
  }

  readStatus(key: string): any {
    return Object(ORDER_STATUS)[key];
  }

  onDelete(categoryId: string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this item?',
      header: 'Delete Confirmation',
      icon: 'pi pi-trash',
      accept: () => {
        this.service.deleteOrder(categoryId).subscribe(
          (res: any) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Delete Order',
              detail: 'Order delete successfully',
            });
            this._fetchData();
          },
          (err) => {
            this.messageService.add({
              severity: 'error',
              summary: `(${err.status}) ${err.statusText}`,
              detail: "Can't delete order",
            });
          }
        );
      },
    });
  }

  onOrderRefresh() {
    this._fetchData();
  }

  private _fetchData() {
    this.service.getOrders().subscribe((res: any) => {
      this.orders = res.result;
    });
  }
}
