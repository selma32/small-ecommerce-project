import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})

export class ProductsService {
  constructor(private api:HttpClient){ }

  getAllProducts():Observable<any>{
    return this.api.get<any[]>("http://localhost:3000/products");
  }

}


