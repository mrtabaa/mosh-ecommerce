import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class NewProductService {

  constructor(private db: AngularFireDatabase) { }

  async createProduct(product: Product): Promise<void> {
    if (product.type !== 'newType' && product.category !== 'newCategory') {
      await this.db.list<Product>('/products/' + product.type + '/' + product.category)
        .push({
          imageUrl: product.imageUrl,
          price: product.price,
          title: product.title,
        });
    }
  }
}

