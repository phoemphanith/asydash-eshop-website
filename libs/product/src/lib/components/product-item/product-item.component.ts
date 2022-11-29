import { Component, Input } from '@angular/core';
import { Product } from '../../models/product.mode';

@Component({
  selector: 'product-item',
  templateUrl: './product-item.component.html',
})
export class ProductItemComponent {
  @Input() product: Product | any;
  constructor() {}
}
