import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  types = ['Food', 'Electronic', 'Cosmetic'];

  getCategory(selectedType: string): string[] {
    switch (selectedType) {
      case 'Food':
        return ['Bread', 'Bevrage', 'Milk'];
      case 'Electronic':
        return ['Phone', 'Labtop', 'TV'];
      case 'Cosmetic':
        return ['Lipstick', 'Lution'];
      default:
        return null;
    }
  }

  createProduct(product: Product): void {
    this.db.list<Product>('/products/' + product.type + '/' + product.category)
      .push({
        imageUrl: product.imageUrl,
        price: product.price,
        title: product.title
      });
  }
}

