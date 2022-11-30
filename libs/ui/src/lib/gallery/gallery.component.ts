import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
interface Image {
  src: string;
  active: boolean;
}
@Component({
  selector: 'ui-gallery',
  templateUrl: './gallery.component.html',
})
export class GalleryComponent implements OnInit {
  @Input() images: string[] | any;
  objImages: Image[] | any;
  imageSelected: Image | any;
  isLoading: boolean = true;

  constructor() {}

  ngOnInit(): void {
    if (this.hasImages) {
      this.getImage().subscribe(
        (res: any) => {
          this.imageSelected = res[0];
          this.objImages = res;
          this.isLoading = false;
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  onSelectImage(value: any) {
    this.imageSelected = value;
    this.objImages = this.objImages.map((image: any) => ({
      ...image,
      active: value.src === image.src,
    }));
  }

  getImage(): Observable<any> {
    return new Observable((sub) => {
      sub.next(
        this.images.map((image: string, index: number) => ({
          src: image,
          active: index === 0,
        }))
      );
    });
  }

  get hasImages() {
    return this.images?.length > 0;
  }
}
