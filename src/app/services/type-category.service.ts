import { Injectable } from '@angular/core';
import { AngularFireDatabase, SnapshotAction } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ProductTypeCategory } from '../models/ProductTypes';

@Injectable({
  providedIn: 'root'
})
export class TypeCategoryService {

  typesList: string[] = [];
  typeCategoryObjList: ProductTypeCategory[] = [];
  categoriesList: any[] = [];

  constructor(private db: AngularFireDatabase) {
    // pre-load for better performance
    this.getTypeCategoryObjList();
  }

  private getTypeCategoryObjList(): void {
    this.db.list('/typeAndCategory/').snapshotChanges()
      .pipe(take(1))
      .subscribe(obj => {
        for (const iterator of obj) {
          const type = iterator.key;
          // get typeCategoryObjList
          this.db.list<ProductTypeCategory>('/typeAndCategory/' + type).valueChanges()
            .pipe(take(1))
            .subscribe((catList: ProductTypeCategory[]) => {
              this.typeCategoryObjList.push({
                typeCatDict: {
                  [type]: catList
                }
              });
            });

          // get types
          this.typesList.push(iterator.key);
        }
      });
  }

  getCategory(selectedType: string): string[] {
    this.categoriesList = [];

    for (const iterator of this.typeCategoryObjList) {
      if (iterator.typeCatDict[selectedType]) {
        this.categoriesList = iterator.typeCatDict[selectedType];
        break;
      }
    }

    return this.categoriesList;
  }

  async addType(newType: string): Promise<void> {
    newType = newType.toLowerCase();

    if (this.typesList && !this.typesList.includes(newType)) {
      await this.db.list<string>('/typeAndCategory/' + newType)
        .push('');

      this.typesList.push(newType);
    }
  }

  async addCategory(newCategory: string, selectedType: string): Promise<string[]> {
    newCategory = newCategory.toLowerCase();
    selectedType = selectedType.toLowerCase();

    if (this.categoriesList && !this.categoriesList.includes(newCategory)) {
      await this.db.list<string>('/typeAndCategory/' + selectedType)
        .push(newCategory);

      this.categoriesList.push(newCategory);
    }

    return this.categoriesList;
  }
}
