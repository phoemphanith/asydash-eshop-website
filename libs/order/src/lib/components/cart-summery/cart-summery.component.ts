import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as CountryData from 'i18n-iso-countries';

@Component({
  selector: 'cart-summery',
  templateUrl: './cart-summery.component.html',
})
export class CartSummeryComponent implements OnInit {
  @Input() carts: any;
  tax: number = 0.25;
  objCountry: any;
  orderForm: any;
  isSubmit: boolean = false;

  constructor(private fb: FormBuilder) {
    this.orderForm = this.fb.group({
      shippingAddress1: ['', Validators.required],
      shippingAddress2: [''],
      city: ['', Validators.required],
      zip: ['', Validators.required],
      country: ['', Validators.required],
      phone: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this._getCountries();
  }

  submitOrder() {
    this.isSubmit = true;
    if (this.orderForm.valid) {
      const orderModel = {
        orderItems: this.carts.map((cart: any) => ({
          quantity: cart.quantity,
          product: cart.productId,
        })),
        shippingAddress1: this.orderForm.controls.shippingAddress1.value,
        shippingAddress2: this.orderForm.controls.shippingAddress2.value,
        city: this.orderForm.controls.city.value,
        zip: this.orderForm.controls.zip.value,
        country: this.orderForm.controls.country.value,
        phone: this.orderForm.controls.phone.value,
        user: '1234',
      };
      // TODO: Create Order
      console.log(orderModel);
    }
  }

  private _getCountries() {
    CountryData.registerLocale(require('i18n-iso-countries/langs/en.json'));
    this.objCountry = Object.entries(
      CountryData.getNames('en', { select: 'official' })
    ).map((entry) => {
      return { _id: entry[0], name: entry[1] };
    });
  }

  get TotalPrice() {
    if (this.carts.length > 0) {
      return this.carts.reduce(
        (sum: number, cart: any) =>
          sum + Math.round(cart.productPrice * cart.quantity),
        0
      );
    }
    return 0;
  }
}
