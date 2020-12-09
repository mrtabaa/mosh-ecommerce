import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class NewProductService {

  constructor(private db: AngularFireDatabase) { }

  types = new Array();
  categories = new Array();


  getCategory(selectedType: string): string[] {
    if (this.types && this.types.length > 0) {
      return this.categories[this.types.indexOf(selectedType)];
    }
  }

  addType(newType: string): void {
    this.types.push(newType);
  }

  addCategory(newCategory: string, selectedType: string): void {
    if (this.types && this.types.length > 0) {
      const typeIndex = this.types.indexOf(selectedType);
      this.categories[typeIndex].push(newCategory);
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

