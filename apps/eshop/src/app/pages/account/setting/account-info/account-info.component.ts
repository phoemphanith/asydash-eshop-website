import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User, UserService } from '@eshop/user-auth';
import { MessageService } from 'primeng/api';
import * as CountryData from 'i18n-iso-countries';

@Component({
  selector: 'eshop-account-info',
  templateUrl: './account-info.component.html',
})
export class AccountInfoComponent implements OnInit {
  errorMessage: string = '';
  currentId: string = '';
  objCountry: any;
  isLoading: boolean = false;

  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]],
    street: ['', [Validators.required]],
    apartment: ['', [Validators.required]],
    city: ['', [Validators.required]],
    zip: ['', [Validators.required]],
    country: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    isAdmin: [false],
  });

  constructor(
    private fb: FormBuilder,
    private service: UserService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this._fetchData();
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

    this._updateItem(item);
  }

  _updateItem(item: User) {
    this.isLoading = true;
    this.service.updateUser(item).subscribe(
      () => {
        this.messageService.add({
          key: 'bc',
          severity: 'success',
          summary: 'User Information',
          detail: 'Update information successfully',
        });
        this.isLoading = false;
        this.service.initAppSession();
      },
      (err) => {
        this.messageService.add({
          key: 'bc',
          severity: 'error',
          summary: `(${err.status}) ${err.statusText}`,
          detail: "Can't update information",
        });
      }
    );
  }

  onRefresh() {
    this._fetchData();
  }

  private _fetchData() {
    this.isLoading = true;
    this.service._currentUser().subscribe((user: any) => {
      if (user) {
        this.isLoading = false;
        this.currentId = user._id;
        this.userForm.name.setValue(user.name);
        this.userForm.email.setValue(user.email);
        this.userForm.street.setValue(user.street);
        this.userForm.apartment.setValue(user.apartment);
        this.userForm.city.setValue(user.city);
        this.userForm.zip.setValue(user.zip);
        this.userForm.country.setValue(user.country);
        this.userForm.phone.setValue(user.phone);
        this.userForm.isAdmin.setValue(user.isAdmin);
        this.userForm.password.setValidators([]);
        this.userForm.password.updateValueAndValidity();
      }
    });
  }

  private _getCountries() {
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
