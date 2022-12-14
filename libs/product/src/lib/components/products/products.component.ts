import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../../models/category.model';
import { Product } from '../../models/product.mode';
import { CategoryService } from '../../services/category.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit {
  categories: Category[] | any;
  products: Product[] | any;
  isCategoryPage: boolean = false;
  isProductLoading: boolean = false;
  isCategoryLoading: boolean = false;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._getCategories();
    this.route.params.subscribe((params: any) => {
      params.id ? this._getProducts(params.id) : this._getProducts();
      params.id ? (this.isCategoryPage = true) : (this.isCategoryPage = false);
    });
  }

  onSelectCategory(id?: string) {
    this._getProducts(id);
    this.categories = this.categories.map((category: any) => ({
      ...category,
      active: category._id === id,
    }));
  }

  private _getCategories() {
    this.isCategoryLoading = true;
    this.categoryService.getCategories().subscribe((res: any) => {
      this.categories = res.result;
      this.isCategoryLoading = false;
    });
  }

  private _getProducts(categoryId?: string) {
    this.isProductLoading = true;
    this.productService.getProducts(categoryId).subscribe((res: any) => {
      this.products = res.result;
      this.isProductLoading = false;
    });
  }
}
