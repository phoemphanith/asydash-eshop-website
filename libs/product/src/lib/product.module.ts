import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { BadgeModule } from 'primeng/badge';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';

import { CategoryBannerComponent } from './components/category-banner/category-banner.component';
import { ProductFeatureComponent } from './components/product-feature/product-feature.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { ProductSearchComponent } from './components/product-search/product-search.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiModule } from '@eshop/ui';

const routes: Route[] = [
  {
    path: 'products',
    component: ProductsComponent,
  },
  {
    path: 'products/:id',
    component: ProductPageComponent,
  },
  {
    path: 'category/:id',
    component: ProductsComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    BadgeModule,
    InputNumberModule,
    ButtonModule,
    UiModule,
  ],
  declarations: [
    CategoryBannerComponent,
    ProductFeatureComponent,
    ProductItemComponent,
    ProductSearchComponent,
    ProductsComponent,
    ProductPageComponent,
  ],
  exports: [
    CategoryBannerComponent,
    ProductFeatureComponent,
    ProductSearchComponent,
    ProductsComponent,
  ],
})
export class ProductModule {}
