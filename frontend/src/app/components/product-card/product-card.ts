import { Component, inject, input } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ToastService } from '../../services/toast.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  product = input.required<any>();

  private _cartService = inject(CartService);
  private _toastServce = inject(ToastService)

  addToCart(event:Event){
    event.preventDefault();
    event.stopPropagation();

    this._cartService.addToCart(this.product()._id,1).subscribe({
      next:()=>{
        this._cartService.refreshCart();
        this._toastServce.show("Added to cart")
      },error:(err)=>{
        this._toastServce.show(err.error?.message || 'Failed to add to cart', 'error');
      }
    })
  }
}
