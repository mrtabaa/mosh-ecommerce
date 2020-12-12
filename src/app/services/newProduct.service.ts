import { Injectable } from '@angular/core';
import { AngularFireDatabase, SnapshotAction } from '@angular/fire/database';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { Product } from '../models/product.model';
import { ProductTypeCategory } from '../models/ProductTypes';

@Injectable({
  providedIn: 'root'
})
export class NewProductService {

  types$: Observable<SnapshotAction<ProductTypeCategory>[]>;
  isExist$: Observable<boolean>;
  typeList = [''];

  constructor(private db: AngularFireDatabase) {
    this.types$ = this.db.list<ProductTypeCategory>('/ProductTypeCategory/').snapshotChanges();
    this.types$.pipe(take(1)).subscribe(obj => {
      obj.forEach(element => {
        if (element) {
          this.typeList.push(element.key);
        }
      });
    });
  }

  addType(newType: string): Observable<boolean> {
    if (this.typeList.includes(newType)) {
      return of(true);
    }
    else {
      this.db.list<ProductTypeCategory>('/ProductTypeCategory/' + newType)
        .push({
          category: ''
        });
      this.typeList.push(newType);
      return of(false);
    }
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

