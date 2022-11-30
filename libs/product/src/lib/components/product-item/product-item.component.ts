import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../models/product.mode';

@Component({
  selector: 'product-item',
  templateUrl: './product-item.component.html',
})
export class ProductItemComponent {
  isActive: boolean = false;
  @Input() product: Product | any;
  constructor(private router: Router) {}
  onProductSelect(id: string) {
    this.router.navigate([`/products/${id}`]);
  }
  onAddCart() {
    console.log('add cart');
  }
}
