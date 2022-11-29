import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routing';
import { HttpClientModule } from '@angular/common/http';

import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';

import { AppComponent } from './app.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { UiModule } from '@eshop/ui';
import { ProductModule } from '@eshop/product';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    ProductListComponent,
    HeaderComponent,
    FooterComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    BadgeModule,
    UiModule,
    ProductModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
