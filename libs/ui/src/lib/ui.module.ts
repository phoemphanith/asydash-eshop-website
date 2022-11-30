import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './banner/banner.component';
import { GalleryComponent } from './gallery/gallery.component';

@NgModule({
  imports: [CommonModule],
  declarations: [BannerComponent, GalleryComponent],
  exports: [BannerComponent, GalleryComponent],
})
export class UiModule {}
