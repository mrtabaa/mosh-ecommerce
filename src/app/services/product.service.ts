import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  types = ['Food', 'Electronic', 'Cosmetic'];
  categories = [
    ['Bread', 'Bevrage', 'Milk'],
    ['Phone', 'Labtop', 'TV'],
    ['Lipstick', 'Lution']
  ];

  getCategory(selectedType: string): string[] {
    return this.categories[this.types.indexOf(selectedType)];
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

