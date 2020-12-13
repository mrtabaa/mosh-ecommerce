import { Injectable } from '@angular/core';
import { AngularFireDatabase, SnapshotAction } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Product } from '../models/product.model';
import { ProductTypeCategory } from '../models/ProductTypes';

@Injectable({
  providedIn: 'root'
})
export class NewProductService {

  types$: Observable<SnapshotAction<ProductTypeCategory>[]>;
  categories$: Observable<ProductTypeCategory[]>;
  typesList: string[] = [];
  typeObj: ProductTypeCategory[] = [];
  categoryList: string[] = [];

  constructor(private db: AngularFireDatabase) {
    // pre-load for better performance
    this.getTypes();
  }

  private getTypes(): void {
    this.types$ = this.db.list<ProductTypeCategory>('/ProductTypeCategory/').snapshotChanges();
    this.types$.pipe(take(1))
      .subscribe(obj => {
        for (const iterator of obj) {
          this.typesList.push(iterator.key);
        }
      });
  }

  addType(newType: string): boolean {
    if (this.typesList.includes(newType)) {
      return true;
    }
    else {
      this.db.list<ProductTypeCategory>('/ProductTypeCategory/' + newType)
        .push({
          category: ''
        });
      this.typesList.push(newType);
      return false;
    }
  }

  addCategory(newCategory: string, selectedType: string): boolean {
    this.db.list<ProductTypeCategory>('/ProductTypeCategory/' + selectedType)
      .push({
        category: newCategory
      });
    return null;
  }

  getCategory(selectedType: string): string[] {
    this.categories$ = this.db.list<ProductTypeCategory>('/ProductTypeCategory/' + selectedType).valueChanges();
    this.categories$.pipe(take(1))
      .subscribe(obj => {
        for (const iterator of obj) {
          if (iterator.category !== '') {
            this.categoryList.push(iterator.category);
          }
        }
      });
    console.log(this.categoryList);
    return this.categoryList;
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

