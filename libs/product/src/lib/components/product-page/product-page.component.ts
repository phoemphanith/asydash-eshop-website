import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product.mode';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'product-page',
  templateUrl: './product-page.component.html',
})
export class ProductPageComponent implements OnInit {
  isLoading: boolean = false;
  product: Product | any;
  productQty: number = 0;

  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.route.params.subscribe((params: any) => {
      if (params.id) {
        this.productService.getProduct(params.id).subscribe((res: any) => {
          this.product = res.result;
          this.isLoading = false;
        });
      }
    });
  }
}
