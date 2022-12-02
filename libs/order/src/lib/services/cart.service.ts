import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
interface Cart {
  items: CartItem[];
}

interface CartItem {
  productId: string;
  productName: string;
  productImage: string;
  productPrice: string;
  quantity: number;
}

interface CartDetail {
  product: any;
  quantity: number;
}
const CART_TEXT = 'cartItems';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartSubject: BehaviorSubject<Cart> = new BehaviorSubject<Cart>(
    this.getCartItem()
  );

  constructor() {}

  getCartItem(): Cart {
    const cartItems = localStorage.getItem(CART_TEXT);
    let cart;
    if (cartItems) {
      cart = JSON.parse(cartItems);
    }
    return cart;
  }

  setCartItem(cartItem: CartItem | any, isUpdate: boolean = false) {
    let cart = this.getCartItem();
    if (cart) {
      const cartExit = cart.items.find(
        (item) => item.productId === cartItem.productId
      );
      if (cartExit) {
        if (isUpdate) {
          cart.items = cart.items.map((item) => ({
            ...item,
            quantity:
              item.productId === cartItem.productId
                ? cartItem.quantity
                : item.quantity,
          }));
        } else {
          cart.items = cart.items.map((item) => ({
            ...item,
            quantity:
              item.productId === cartItem.productId
                ? item.quantity + cartItem.quantity
                : item.quantity,
          }));
        }
      } else {
        cart.items.push(cartItem);
      }
    } else {
      cart = { items: [cartItem] };
    }
    this._setCartItem(cart);
  }

  removeCartItem(productId: string) {
    let cart = this.getCartItem();
    if (cart) {
      cart.items = cart.items.filter(
        (item: any) => item.productId !== productId
      );
    }
    this._setCartItem(cart);
  }

  clearCartItem() {
    this._setCartItem({ items: [] });
  }

  private _setCartItem(cart: Cart) {
    const jsonItems = JSON.stringify(cart);
    this.cartSubject.next(cart);
    localStorage.setItem(CART_TEXT, jsonItems);
  }
}
