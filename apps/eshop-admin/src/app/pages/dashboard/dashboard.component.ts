import { Component, OnInit } from '@angular/core';
import { DashboardService } from '@eshop/ui';

@Component({
  selector: 'eshop-admin-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  productCount: number = 0;
  orderCount: number = 0;
  saleCount: number = 0;
  constructor(private service: DashboardService) {}
  ngOnInit(): void {
    this.service
      .getProductCount()
      .subscribe((res: any) => (this.productCount = res.result.count));
    this.service
      .getOrderCount()
      .subscribe((res: any) => (this.orderCount = res.result.count));
    this.service
      .getSaleCount()
      .subscribe((res: any) => (this.saleCount = res.result.totalSales));
  }
}
