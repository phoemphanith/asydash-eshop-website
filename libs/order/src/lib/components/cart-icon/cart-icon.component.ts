import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cart-icon',
  templateUrl: './cart-icon.component.html',
})
export class CartIconComponent implements OnInit {
  counter: number = 0;
  cartSub: Subscription | any;
  constructor(private service: CartService) {}

  ngOnInit(): void {
    this.cartSub = this.service.cartSubject.subscribe((res: any) => {
      if (res) {
        this.counter = res.items.reduce(
          (sum: number, current: any) => sum + current.quantity,
          0
        );
      }
    });
  }
}
