import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cart-item',
  templateUrl: './cart-item.component.html',
})
export class CartItemComponent {
  @Input() cart: any;
  @Output() updateQuantity = new EventEmitter();
  @Output() removeCartItem = new EventEmitter();

  onUpdateQuantity() {
    this.updateQuantity.emit(this.cart);
  }

  onRemoveItem() {
    this.removeCartItem.emit(this.cart.productId);
  }
}
