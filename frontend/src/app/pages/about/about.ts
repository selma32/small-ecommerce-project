import { Component } from '@angular/core';
import { NewsSection } from '../../components/news-section/news-section';

@Component({
  selector: 'app-about',
  imports: [NewsSection],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {}
