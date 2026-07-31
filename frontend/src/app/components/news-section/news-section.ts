import { Component, signal } from '@angular/core';


interface NewsItem {
  title: string;
  imgPath:string;
}

@Component({
  selector: 'app-news-section',
  imports: [],
  templateUrl: './news-section.html',
  styleUrl: './news-section.css',
})
export class NewsSection {
  
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
}
