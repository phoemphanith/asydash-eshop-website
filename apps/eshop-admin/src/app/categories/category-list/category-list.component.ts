import { Component, OnInit } from '@angular/core';
import { Category, CategoryService } from '@eshop/product';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'eshop-admin-category-list',
  templateUrl: './category-list.component.html',
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];
  isLoading: boolean = false;
  constructor(
    private service: CategoryService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}
  ngOnInit(): void {
    this.onFetchData();
  }

  onFetchData() {
    this.isLoading = true;
    this.service.getCategories().subscribe((res: any) => {
      if (res) {
        this.categories = res.result;
        this.isLoading = false;
      }
    }, () => {this.isLoading = false});
  }

  onDelete(categoryId: string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this item?',
      header: 'Delete Confirmation',
      icon: 'pi pi-trash',
      accept: () => {
        this.service.deleteCategory(categoryId).subscribe(
          (res: any) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Delete Category',
              detail: 'Category delete successfully',
            });
            this.onFetchData();
          },
          (err) => {
            this.messageService.add({
              severity: 'error',
              summary: `(${err.status}) ${err.statusText}`,
              detail: "Can't delete category",
            });
          }
        );
      },
    });
  }
}
