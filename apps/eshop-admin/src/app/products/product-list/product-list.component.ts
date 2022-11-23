import { Component } from '@angular/core';
import { Product, ProductsService } from '@eshop/product';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'eshop-admin-product-list',
  templateUrl: './product-list.component.html',
})
export class ProductListComponent {
  products: Product[] = [];
  constructor(
    private service: ProductsService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}
  ngOnInit(): void {
    this.onFetchData();
  }

  onFetchData() {
    this.service.getProducts().subscribe((res: any) => {
      this.products = res.result;
    });
  }

  onDelete(itemId: string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this item?',
      header: 'Delete Confirmation',
      icon: 'pi pi-trash',
      accept: () => {
        this.service.deleteProduct(itemId).subscribe(
          () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Delete Product',
              detail: 'Product delete successfully',
            });
            this.onFetchData();
          },
          (err) => {
            this.messageService.add({
              severity: 'error',
              summary: `(${err.status}) ${err.statusText}`,
              detail: "Can't delete product",
            });
          }
        );
      },
    });
  }

  _imageError(e: any) {
    e.target.src =
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png';
  }
}
