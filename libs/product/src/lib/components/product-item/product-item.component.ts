import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '@eshop/order';
import { Product } from '../../models/product.mode';

@Component({
  selector: 'product-item',
  templateUrl: './product-item.component.html',
})
export class ProductItemComponent {
  isActive: boolean = false;
  @Input() product: Product | any;
  constructor(private router: Router, private cartService: CartService) {}
  onProductSelect(id: string) {
    this.router.navigate([`/products/${id}`]);
  }
  onAddCart() {
    const cart = {
      productId: this.product._id,
      productName: this.product.name,
      productImage: this.product.image,
      productPrice: this.product.price,
      quantity: 1,
    };
    this.cartService.setCartItem(cart);
  }
}
