import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cart-page',
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  cartSub: Subscription = new Subscription();
  cartList: any;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartSub = this.cartService.cartSubject.subscribe((carts: any) => {
      if (carts) {
        this.cartList = carts.items;
      } else {
        this.cartList = [];
      }
    });
  }

  onUpdateCart(event: any) {
    this.cartService.setCartItem(event, true);
  }

  onRemoveCart(event: any) {
    this.cartService.removeCartItem(event);
  }

  onClearCart() {
    this.cartService.clearCartItem();
  }

  get CountCart() {
    return this.cartList.length;
  }

  ngOnDestroy(): void {
    this.cartSub.unsubscribe();
  }
}
