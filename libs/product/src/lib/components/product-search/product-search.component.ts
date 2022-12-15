import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'product-search',
  templateUrl: './product-search.component.html',
})
export class ProductSearchComponent implements OnInit {
  search: string = '';
  products = [] as any;
  isLoading: boolean = false;
  constructor(private productService: ProductsService, private router: Router) { }
  
  ngOnInit(): void { }
  
  onOpenSearch() {
    this.isLoading = true;
    setTimeout(() => {
      this.productService.searchProduct(this.search).subscribe((res: any) => {
        if (res) {
          this.products = res.result;
          this.isLoading = false;
        }
      });
    }, 2000);
  }

  selectProduct(id: string) {
    this.search = '';
    this.router.navigate([`products/${id}`]);
  }
}
