import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Product } from '../models/product.model';
import { ProductTypeCategory } from '../models/ProductTypes';

@Injectable({
  providedIn: 'root'
})
export class NewProductService {

  typesList: string[] = [];

  constructor(private db: AngularFireDatabase) {
    // pre-load for better performance
    this.getTypes();
  }

  private getTypes(): void {
    this.db.list<ProductTypeCategory>('/typeAndCategory/').snapshotChanges()
      .pipe(take(1))
      .subscribe(obj => {
        for (const iterator of obj) {
          this.typesList.push(iterator.key);
        }
      });
  }

  addType(newType: string): void {
    newType = newType.toLowerCase();
    this.db.list<ProductTypeCategory>('/typeAndCategory/' + newType)
      .push({
        category: ''
      });
    this.typesList.push(newType);
  }

  async addCategory(newCategory: string, selectedType: string): Promise<void> {
    newCategory = newCategory.toLowerCase();
    selectedType = selectedType.toLowerCase();

    this.db.list<string>('/typeAndCategory/' + selectedType).valueChanges();
  }

  getCategory(selectedType: string): string[] {
    const categoryList: string[] = [];
    this.db.list<ProductTypeCategory>('/typeAndCategory/' + selectedType.toLowerCase()).valueChanges()
      .pipe(take(1))
      .subscribe(obj => {
        for (const iterator of obj) {
          if (iterator.category !== '') {
            categoryList.push(iterator.category);
          }
        }
      });
    return categoryList;
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

