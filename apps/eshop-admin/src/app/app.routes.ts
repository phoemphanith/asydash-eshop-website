import { Route } from '@angular/router';
import { AdminAuthGuardService as AuthGuard } from '@eshop/user-auth';
import { CategoryFormComponent } from './categories/category-form/category-form.component';
import { CategoryListComponent } from './categories/category-list/category-list.component';
import { OrderDetailComponent } from './orders/order-detail/order-detail.component';
import { OrderListComponent } from './orders/order-list/order-list.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductFormComponent } from './products/product-form/product-form.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ShellComponent } from './shared/shell/shell.component';
import { UserFormComponent } from './users/user-form/user-form.component';
import { UserListComponent } from './users/user-list/user-list.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: ShellComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'categories', component: CategoryListComponent },
      { path: 'categories/form', component: CategoryFormComponent },
      { path: 'categories/form/:id', component: CategoryFormComponent },
      { path: 'products', component: ProductListComponent },
      { path: 'products/form', component: ProductFormComponent },
      { path: 'products/form/:id', component: ProductFormComponent },
      { path: 'users', component: UserListComponent },
      { path: 'users/form', component: UserFormComponent },
      { path: 'users/form/:id', component: UserFormComponent },
      { path: 'orders', component: OrderListComponent },
      { path: 'orders/detail/:id', component: OrderDetailComponent },
    ],
  },
];
