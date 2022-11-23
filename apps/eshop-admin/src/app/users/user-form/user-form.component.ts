import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User, UserService } from '@eshop/user-auth';
import { MessageService } from 'primeng/api';
import * as CountryData from 'i18n-iso-countries';

@Component({
  selector: 'eshop-admin-user-form',
  templateUrl: './user-form.component.html',
})
export class UserFormComponent {
  isEditMode: boolean = false;
  currentId: string = '';
  objCountry: any;

  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    street: ['', [Validators.required]],
    apartment: ['', [Validators.required]],
    city: ['', [Validators.required]],
    zip: ['', [Validators.required]],
    country: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    isAdmin: [false, [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private service: UserService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._fetchCategory();
    this._getCountries();
  }

  onSubmit() {
    const item: User = <User>{
      id: this.currentId,
      email: this.userForm.email.value,
      password: this.userForm.password.value,
      name: this.userForm.name.value,
      phone: this.userForm.phone.value,
      street: this.userForm.street.value,
      apartment: this.userForm.apartment.value,
      city: this.userForm.city.value,
      zip: this.userForm.zip.value,
      country: this.userForm.country.value,
      isAdmin: this.userForm.isAdmin.value,
    };

    if (this.isEditMode) {
      this._updateItem(item);
    } else {
      this._addItem(item);
    }
  }

  _addItem(item: User) {
    this.service.createUser(item).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Create User',
          detail: 'User save successfully',
        });
        this.location.back();
      },
      (err) => {
        this.messageService.add({
          severity: 'error',
          summary: `(${err.status}) ${err.statusText}`,
          detail: "Can't create user",
        });
      }
    );
  }

  _updateItem(item: User) {
    this.service.updateUser(item).subscribe(
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
      }
    );
  }

  _fetchCategory() {
    this.route.params.subscribe((params: any) => {
      if (params.id) {
        this.isEditMode = true;
        this.currentId = params.id;
        this.service.getUser(this.currentId).subscribe((res: any) => {
          this.userForm.name.setValue(res.result.name);
          this.userForm.email.setValue(res.result.email);
          this.userForm.street.setValue(res.result.street);
          this.userForm.apartment.setValue(res.result.apartment);
          this.userForm.city.setValue(res.result.city);
          this.userForm.zip.setValue(res.result.zip);
          this.userForm.country.setValue(res.result.country);
          this.userForm.phone.setValue(res.result.phone);
          this.userForm.isAdmin.setValue(res.result.isAdmin);
          this.userForm.password.setValidators([]);
          this.userForm.password.updateValueAndValidity();
        });
      } else {
        this.isEditMode = false;
        this.currentId = '';
      }
    });
  }

  _getCountries() {
    CountryData.registerLocale(require('i18n-iso-countries/langs/en.json'));
    this.objCountry = Object.entries(
      CountryData.getNames('en', { select: 'official' })
    ).map((entry) => {
      return { _id: entry[0], name: entry[1] };
    });
  }

  get userForm() {
    return this.form.controls;
  }
}
