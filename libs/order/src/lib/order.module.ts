import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartIconComponent } from './components/cart-icon/cart-icon.component';
import { CartComponent } from './pages/cart/cart.component';
import { Route, RouterModule } from '@angular/router';

import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';

import { CartItemComponent } from './components/cart-item/cart-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CartSummeryComponent } from './components/cart-summery/cart-summery.component';

const routes: Route[] = [{ path: 'carts', component: CartComponent }];

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    ProgressSpinnerModule,
    InputNumberModule,
    ButtonModule,
    MessageModule,
    InputTextModule,
    DropdownModule,
  ],
  declarations: [
    CartIconComponent,
    CartComponent,
    CartItemComponent,
    CartSummeryComponent,
  ],
  exports: [CartIconComponent],
})
export class OrderModule {}
