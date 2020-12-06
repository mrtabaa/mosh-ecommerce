import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  createProduct(product: Product): void {
    this.db.object<Product>('/products/')
      .set(
        {
          title: product.title,
          price: product.price,
          category: product.category,
          imageUrl: product.imageUrl
        }
      );
  }
}
