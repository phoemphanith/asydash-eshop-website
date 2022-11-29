import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryBannerComponent } from './components/category-banner/category-banner.component';
import { ProductFeatureComponent } from './components/product-feature/product-feature.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { ProductSearchComponent } from './components/product-search/product-search.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    CategoryBannerComponent,
    ProductFeatureComponent,
    ProductItemComponent,
    ProductSearchComponent,
  ],
  exports: [
    CategoryBannerComponent,
    ProductFeatureComponent,
    ProductSearchComponent,
  ],
})
export class ProductModule {}
