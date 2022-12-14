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
  onSaveLoading: boolean = false;
  isEditMode: boolean = false;
  currentId: string = '';
  objCategories = [];
  imageDisplay = [] as any;
  imageFiles = [] as any;

  form = this.fb.group({
    name: ['', Validators.required],
    brand: [''],
    price: [0, Validators.required],
    countInStock: [0, Validators.required],
    category: [''],
    isFeatured: [false, Validators.required],
    description: ['', Validators.required],
    richDescription: [''],
    image: [[], Validators.required],
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

    if (this.imageFiles.length > 0) {
      this.imageFiles.map((file: any) => {
        productData.append('images', file);
      });
    }
    
    if (this.isEditMode) {
      this._updateItem(productData);
    } else {
      this._addItem(productData);
    }
  }

  onFileHandler(event: any) {
    const files = Object.entries(event.target.files) as any;
    
    if (files) {
      this.productForm.image.patchValue(files);
      this.productForm.image.updateValueAndValidity();
      files.map((file: any) => {
        this.imageFiles.push(file[1]);
        const fileReader = new FileReader();
        fileReader.onload = () => {
          this.imageDisplay.push(fileReader.result);
        };
        fileReader.readAsDataURL(file[1]);
      });
    }
  }

  private _addItem(data: FormData) {
    this.onSaveLoading = true;
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
        this.onSaveLoading = false;
        this.messageService.add({
          severity: 'error',
          summary: `(${err.status}) ${err.statusText}`,
          detail: "Can't create product",
        });
      }
    );
  }

  private _updateItem(data: FormData) {
    this.onSaveLoading = true;
    this.service.updateProduct(data, this.currentId).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Update Product',
          detail: 'Product save successfully',
        });
        this.onSaveLoading = false;
        this.location.back();
      },
      (err) => {
        this.onSaveLoading = false;
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
          if (res) {
            console.log(res.result);
            
            this.productForm.name.setValue(res.result.name);
            this.productForm.brand.setValue(res.result.brand);
            this.productForm.price.setValue(res.result.price);
            this.productForm.countInStock.setValue(res.result.countInStock);
            this.productForm.category.setValue(res.result.category);
            this.productForm.isFeatured.setValue(res.result.isFeatured);
            this.productForm.description.setValue(res.result.description);
            this.productForm.richDescription.setValue(res.result.richDescription);
            this.imageDisplay = res.result.images;
            this.productForm.image.setValidators([]);
            this.productForm.image.updateValueAndValidity();
            this.isLoading = false;
          }
        });
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
