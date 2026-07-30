import { Component, OnInit } from '@angular/core';
import { ProductCard } from '../../components/product-card/product-card';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  imports: [ProductCard],
  templateUrl: './products.html',
  styleUrl: './products.css',
})

export class Products implements OnInit {

  products:any[] = []
  
  constructor(private _productService: ProductsService){}

  getProducts(){
    this._productService.getAllProducts().subscribe({
        next:(res)=>{
          console.log(res)
          this.products = res.product;
        },error:(err)=>{
          console.log(err)
        }
      }
    )
  }

  ngOnInit(): void {
    this.getProducts()
  }
}
