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

  constructor(private db: AngularFireDatabase) { }

  getTypes(): Observable<ProductTypeCategory[]> {
    this.types$ = this.db.list<ProductTypeCategory>('/ProductTypeCategory/').snapshotChanges();
    return this.types$;
  }

  addType(newType: string): boolean {
    let isAlreadyExist: boolean;
    this.types$.pipe(take(1)).subscribe(object => {
      for (const item of object) {
        if (item.key === newType) { // if type already exists
          isAlreadyExist = true;
          break;
        }
        else {
          this.db.list<ProductTypeCategory>('/ProductTypeCategory/' + newType)
            .push({
              category: ''
            });
        }
      }
    });
    return isAlreadyExist;
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

