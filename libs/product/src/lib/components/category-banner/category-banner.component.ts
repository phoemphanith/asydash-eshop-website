import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'product-category',
  templateUrl: './category-banner.component.html',
})
export class CategoryBannerComponent implements OnInit {
  categories: Category | any;
  isLoading: boolean = false;
  constructor(private service: CategoryService, private router: Router) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.service.getCategories().subscribe((res: any) => {
      this.categories = res.result;
      this.isLoading = false;
    });
  }

  onSelectCategory(id: string) {
    this.router.navigate([`/category/${id}`]);
  }
}
