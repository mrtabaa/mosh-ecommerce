import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { ProductTypeCategory } from '../models/ProductTypes';

@Injectable({
  providedIn: 'root'
})
export class NewProductService {

  constructor(private db: AngularFireDatabase) { }

  addType(newType: string): void {
    this.db.list<ProductTypeCategory>('/ProductTypeCategory/' + newType)
      .push({
        category: ''
      });
  }

  getTypes(): Observable<ProductTypeCategory[]> {
    return this.db.list<ProductTypeCategory>('/ProductTypeCategory/').snapshotChanges();
  }

  addCategory(newCategory: string, selectedType: string): void {
    this.db.list<ProductTypeCategory>('/ProductTypeCategory/' + selectedType)
      .push({
        category: newCategory
      });
  }


  getCategory(selectedType: string): Observable<ProductTypeCategory[]> {
    return this.db.list<ProductTypeCategory>('/ProductTypeCategory/' + selectedType).valueChanges();
  }

  createProduct(product: Product): void {
    if (product.type !== 'newType' && product.category !== 'newCategory') {
      this.db.list<Product>('/products/' + product.type + '/' + product.category)
        .push({
          imageUrl: product.imageUrl,
          price: product.price,
          title: product.title
        });
    }
  }
}

