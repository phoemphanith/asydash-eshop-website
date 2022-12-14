import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Category, CategoryService } from '@eshop/product';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'eshop-admin-category-form',
  templateUrl: './category-form.component.html',
})
export class CategoryFormComponent implements OnInit {
  isEditMode: boolean = false;
  currentId: string = '';
  isLoading: boolean = false;
  saveLoading: boolean = false;

  form = this.fb.group({
    name: ['', Validators.required],
    icon: ['', Validators.required],
    color: [''],
  });

  constructor(
    private fb: FormBuilder,
    private service: CategoryService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.onFetchCategory();
  }

  onSubmit() {
    this.saveLoading = true;
    const item: Category = <Category>{
      id: this.currentId,
      name: this.categoryForm.name.value,
      icon: this.categoryForm.icon.value,
      color: this.categoryForm.color.value,
    };

    if (this.isEditMode) {
      this._updateItem(item);
    } else {
      this._addItem(item);
    }
  }

  _addItem(item: Category) {
    this.service.createCategory(item).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Create Category',
          detail: 'Category save successfully',
        });
        this.location.back();
      },
      (err) => {
        this.messageService.add({
          severity: 'error',
          summary: `(${err.status}) ${err.statusText}`,
          detail: "Can't create category",
        });
        this.saveLoading = false;
      }
    );
  }

  _updateItem(item: Category) {
    this.service.updateCategory(item).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Update Category',
          detail: 'Category save successfully',
        });
        this.location.back();
      },
      (err) => {
        this.messageService.add({
          severity: 'error',
          summary: `(${err.status}) ${err.statusText}`,
          detail: "Can't update category",
        });
        this.saveLoading = false;
      }
    );
  }

  onFetchCategory() {
    this.isLoading = true;
    this.route.params.subscribe((params: any) => {
      if (params.id) {
        this.isEditMode = true;
        this.currentId = params.id;
        this.service.getCategory(this.currentId).subscribe((res: any) => {
          if (res) {
            this.categoryForm.name.setValue(res.result.name);
            this.categoryForm.icon.setValue(res.result.icon);
            this.categoryForm.color.setValue(res.result.color);
            this.isLoading = false;
          }
        });
      } else {
        this.isEditMode = false;
        this.isLoading = false;
        this.currentId = '';
      }
    });
  }

  get categoryForm() {
    return this.form.controls;
  }
}
