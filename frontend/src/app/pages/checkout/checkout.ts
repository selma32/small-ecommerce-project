import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';


@Component({
  selector: 'app-checkout',
  imports: [],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})

export class Checkout {
  private _cartService = inject(CartService);

  cartItems = this._cartService.cartItems

  get total(): number {
    return this.cartItems().reduce((sum, item) => sum + (item.product.price * item.amount), 0);
  }
}
