import { Component, inject, OnInit, signal } from '@angular/core';
import { Search } from '../../components/search/search';
import { ProductCard } from '../../components/product-card/product-card';
import { ProductsService } from '../../services/products.service';



interface NewsItem {
  title: string;
  imgPath:string;
}

@Component({
  selector: 'app-home',
  imports: [Search, ProductCard],
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

  news = signal<NewsItem[]>([
    { 
      title: 'All your needs',
      imgPath:'/images/food.png'
    },
    { 
      title: 'Cheaper prices',
      imgPath:'/images/discount.png'
    },
    { title: 'Home delivery',
      imgPath:'/images/delivery.png'
    },
    { 
      title: 'Around the clock',
      imgPath:'/images/history.png'
    }
  ])

  ngOnInit(): void {
    this.getTrendingProducts();
  }

}
