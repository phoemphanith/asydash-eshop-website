import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User, UserService } from '@eshop/user-auth';
import * as CountryData from 'i18n-iso-countries';
import { Subscription } from 'rxjs';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'cart-summery',
  templateUrl: './cart-summery.component.html',
})
export class CartSummeryComponent implements OnInit {
  @Input() carts: any;
  tax: number = 0.25;
  objCountry: any;
  orderForm = this.fb.group({
    shippingAddress1: ['', Validators.required],
    shippingAddress2: [''],
    city: ['', Validators.required],
    zip: ['', Validators.required],
    country: ['', Validators.required],
    phone: ['', Validators.required],
    user: [''],
  });
  isSubmit: boolean = false;
  userSub: Subscription = new Subscription();
  user = {} as User;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private orderService: OrderService,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this._getCountries();
    this._initForm();
  }

  submitOrder() {
    this.isSubmit = true;
    if (this.orderForm.valid && this.carts.length > 0) {
      const orderModel = {
        orderItems: this.carts.map((cart: any) => ({
          quantity: cart.quantity,
          product: cart.productId,
        })),
        shippingAddress1: this.formControls.shippingAddress1.value,
        shippingAddress2: this.formControls.shippingAddress2.value,
        city: this.formControls.city.value,
        zip: this.formControls.zip.value,
        country: this.formControls.country.value,
        phone: this.formControls.phone.value,
        user: this.formControls.user.value,
      };

      this.orderService.createOrder(orderModel).subscribe(
        (res: any) => {
          this.router.navigateByUrl('/success');
          this.cartService.clearCartItem();
        },
        (err: any) => {
          if (err.status == 401) {
            this.router.navigateByUrl('/login');
          }
        }
      );
    }
  }

  private _initForm() {
    this.userSub = this.userService._currentUser().subscribe((user: any) => {
      if (user) {
        this.formControls.country.setValue(user.country);
        this.formControls.shippingAddress1.setValue(user.street);
        this.formControls.city.setValue(user.city);
        this.formControls.zip.setValue(user.zip);
        this.formControls.phone.setValue(user.phone);
        this.formControls.user.setValue(user._id);
        this.orderForm.updateValueAndValidity();
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

  get formControls() {
    return this.orderForm.controls;
  }
}
