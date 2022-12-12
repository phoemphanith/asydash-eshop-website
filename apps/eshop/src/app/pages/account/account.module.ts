import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AuthGuardService as AuthGuard } from '@eshop/user-auth';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { TableModule } from 'primeng/table';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout.component';
import { OrderComponent } from './order/order.component';
import { ProductModule } from '@eshop/product';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderModule } from '@eshop/order';
import { MessageService } from 'primeng/api';

const routes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'orders', component: OrderComponent },
      { path: 'orders/:id', component: OrderDetailComponent },
      {
        path: 'setting',
        loadChildren: () =>
          import('./setting/setting.module').then((m) => m.SettingModule),
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ButtonModule,
    TagModule,
    TableModule,
    ProductModule,
    FormsModule,
    ReactiveFormsModule,
    OrderModule,
  ],
  declarations: [
    DashboardComponent,
    LayoutComponent,
    OrderComponent,
    OrderDetailComponent,
  ],
  exports: [],
  providers: [MessageService],
})
export class AccountModule {}
