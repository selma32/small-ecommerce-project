import { Component, inject, input, OnInit, signal } from '@angular/core';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails implements OnInit{

  id = input.required<string>();

  product = signal<any>(null);
  notFound = signal(false);

  private _productsSurvice = inject(ProductsService)

  ngOnInit(): void {
    this._productsSurvice.getProductById(this.id()).subscribe({
      next:(res:any)=>{
        this.product.set(res.product);
      },error:(err)=>{
        this.notFound.set(true);
      }
    })
  }
  
}
