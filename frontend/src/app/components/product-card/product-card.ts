import { Component, inject, input } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  product = input.required<any>();

  private _cartService = inject(CartService);

  addToCart(event:Event){
    event.stopPropagation();
    this._cartService.addToCart(this.product()._id,1).subscribe({
      next:()=>{
        this._cartService.refreshCart();
      },error:(err)=>{
        console.log(err.error?.message);
      }
    })
  }
}
