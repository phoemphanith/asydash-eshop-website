import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { BadgeModule } from 'primeng/badge';

import { CategoryBannerComponent } from './components/category-banner/category-banner.component';
import { ProductFeatureComponent } from './components/product-feature/product-feature.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { ProductSearchComponent } from './components/product-search/product-search.component';
import { ProductsComponent } from './components/products/products.component';

const routes: Route[] = [
  {
    path: 'products',
    component: ProductsComponent,
  },
  {
    path: 'category/:id',
    component: ProductsComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), BadgeModule],
  declarations: [
    CategoryBannerComponent,
    ProductFeatureComponent,
    ProductItemComponent,
    ProductSearchComponent,
    ProductsComponent,
  ],
  exports: [
    CategoryBannerComponent,
    ProductFeatureComponent,
    ProductSearchComponent,
    ProductsComponent,
  ],
})
export class ProductModule {}
