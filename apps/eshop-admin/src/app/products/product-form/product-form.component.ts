import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoryService, Product, ProductsService } from '@eshop/product';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'eshop-admin-product-form',
  templateUrl: './product-form.component.html',
})
export class ProductFormComponent {
  isLoading: boolean = false;
  isEditMode: boolean = false;
  currentId: string = '';
  objCategories = [];
  imageDisplay: any;

  form = this.fb.group({
    name: ['', Validators.required],
    brand: [''],
    price: [0, Validators.required],
    countInStock: [0, Validators.required],
    category: [''],
    isFeatured: [false, Validators.required],
    description: ['', Validators.required],
    richDescription: [''],
    image: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private service: ProductsService,
    private categoryService: CategoryService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._fetchProduct();
    this._fetchCategories();
  }

  onSubmit() {
    const productData = new FormData();
    Object.keys(this.productForm).map((key) => {
      productData.append(key, this.form.get(key)?.value);
    });
    if (this.isEditMode) {
      this._updateItem(productData);
    } else {
      this._addItem(productData);
    }
  }

  onFileHandler(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.productForm.image.patchValue(file);
      this.productForm.image.updateValueAndValidity();
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result;
      };
      fileReader.readAsDataURL(file);
    }
  }

  private _addItem(data: FormData) {
    this.service.createProduct(data).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Create Product',
          detail: 'Product save successfully',
        });
        this.location.back();
      },
      (err) => {
        this.messageService.add({
          severity: 'error',
          summary: `(${err.status}) ${err.statusText}`,
          detail: "Can't create product",
        });
      }
    );
  }

  private _updateItem(data: FormData) {
    this.service.updateProduct(data, this.currentId).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Update Product',
          detail: 'Product save successfully',
        });
        this.location.back();
      },
      (err) => {
        this.messageService.add({
          severity: 'error',
          summary: `(${err.status}) ${err.statusText}`,
          detail: "Can't update product",
        });
      }
    );
  }

  private _fetchProduct() {
    this.isLoading = true;
    this.route.params.subscribe((params: any) => {
      if (params.id) {
        this.isEditMode = true;
        this.currentId = params.id;
        this.service.getProduct(this.currentId).subscribe((res: any) => {
          this.productForm.name.setValue(res.result.name);
          this.productForm.brand.setValue(res.result.brand);
          this.productForm.price.setValue(res.result.price);
          this.productForm.countInStock.setValue(res.result.countInStock);
          this.productForm.category.setValue(res.result.category);
          this.productForm.isFeatured.setValue(res.result.isFeatured);
          this.productForm.description.setValue(res.result.description);
          this.productForm.richDescription.setValue(res.result.richDescription);
          this.imageDisplay = res.result.image;
          this.productForm.image.setValidators([]);
          this.productForm.image.updateValueAndValidity();
        });
        this.isLoading = false;
      } else {
        this.isEditMode = false;
        this.currentId = '';
        this.isLoading = false;
      }
    });
  }

  private _fetchCategories() {
    this.categoryService.getCategories().subscribe((res: any) => {
      this.objCategories = res.result;
    });
  }

  get productForm() {
    return this.form.controls;
  }
}
