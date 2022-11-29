import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.mode';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'product-feature',
  templateUrl: './product-feature.component.html',
})
export class ProductFeatureComponent implements OnInit {
  products: Product[] | any;
  constructor(private service: ProductsService) {}
  ngOnInit(): void {
    this.service.getProductsFeature(8).subscribe((res: any) => {
      this.products = res.result;
    });
  }
}
