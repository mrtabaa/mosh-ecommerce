import { Injectable } from '@angular/core';
import { AngularFireDatabase, SnapshotAction } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Product } from '../models/product.model';
import { ProductTypeCategory } from '../models/ProductTypes';

@Injectable({
  providedIn: 'root'
})
export class NewProductService {

  types$: Observable<SnapshotAction<ProductTypeCategory>[]>;
  typesList: string[] = [];

  constructor(private db: AngularFireDatabase) {
    // pre-load for better performance
    this.getTypes();
  }

  private getTypes(): void {
    this.types$ = this.db.list<ProductTypeCategory>('/typeAndCategory/').snapshotChanges();
    this.types$.pipe(take(1))
      .subscribe(obj => {
        for (const iterator of obj) {
          this.typesList.push(iterator.key);
        }
      });
  }

  addType(newType: string): boolean {
    newType = newType.toLowerCase();

    if (this.typesList.includes(newType)) {
      return true;
    }
    else {
      this.db.list<ProductTypeCategory>('/typeAndCategory/' + newType)
        .push({
          category: ''
        });
      this.typesList.push(newType);
      return false;
    }
  }

  async addCategory(newCategory: string, selectedType: string): Promise<void> {
    newCategory = newCategory.toLowerCase();
    selectedType = selectedType.toLowerCase();

    this.db.list<string>('/typeAndCategory/' + selectedType.toLowerCase()).valueChanges();


    // .toPromise((resolve, reject) => {

    // }).then(data => {
    //   for (const iterator of data) {
    //     if (iterator === newCategory) {
    //       console.log(couter++);
    //       console.log(iterator);
    //       return false;
    //     }
    //   }
    // });
    // .pipe(
    //   map(obj => {
    //     console.log('test');
    //     for (const iterator of obj) {
    //       if (iterator.category === newCategory) {
    //         return true;
    //       }
    //     }
    //     this.db.list<ProductTypeCategory>('/ProductTypeCategory/' + selectedType)
    //       .push({
    //         category: newCategory
    //       });
    //     return false;
    //   })
    // );
  }

  getCategory(selectedType: string): Observable<ProductTypeCategory[]> {
    return this.db.list<ProductTypeCategory>('/typeAndCategory/' + selectedType.toLowerCase()).valueChanges();
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

