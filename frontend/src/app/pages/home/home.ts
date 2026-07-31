import { Component, inject, OnInit, signal } from '@angular/core';
import { Search } from '../../components/search/search';
import { ProductCard } from '../../components/product-card/product-card';
import { ProductsService } from '../../services/products.service';
import { NewsSection } from '../../components/news-section/news-section';

@Component({
  selector: 'app-home',
  imports: [Search, ProductCard, NewsSection],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  trendingProducts = signal<any[]>([]);
  
  private _trendingProducts = inject(ProductsService)

  getTrendingProducts(){
      this._trendingProducts.getAllProducts().subscribe({
      next: (res: any) => {
        this.trendingProducts.set(res.product.slice(0, 4));
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  ngOnInit(): void {
    this.getTrendingProducts();
  }

}
