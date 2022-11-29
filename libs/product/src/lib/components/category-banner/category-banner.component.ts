import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'product-category',
  templateUrl: './category-banner.component.html',
})
export class CategoryBannerComponent implements OnInit {
  categories: Category | any;
  constructor(private service: CategoryService) {}

  ngOnInit(): void {
    this.service.getCategories().subscribe((res: any) => {
      this.categories = res.result;
    });
  }
}
