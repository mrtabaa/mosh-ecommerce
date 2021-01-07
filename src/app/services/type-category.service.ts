import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TypeCategoryService {

  typesList: string[] = [];
  categoryList: string[] = [];

  constructor(private db: AngularFireDatabase) {
    // pre-load for better performance
    this.getTypes();
  }

  private getTypes(): void {
    this.db.list<string>('/typeAndCategory/').snapshotChanges()
      .pipe(take(1))
      .subscribe(obj => {
        for (const iterator of obj) {
          this.typesList.push(iterator.key);
        }
      });
  }

  getCategory(selectedType: string): string[] {
    this.categoryList = [];

    this.db.list<string>('/typeAndCategory/' + selectedType.toLowerCase()).valueChanges()
      .pipe(take(1))
      .subscribe(obj => {
        for (const iterator of obj) {
          if (iterator !== '') {
            this.categoryList.push(iterator);
          }
        }
      });
    return this.categoryList;
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

    if (this.categoryList && !this.categoryList.includes(newCategory)) {
      await this.db.list<string>('/typeAndCategory/' + selectedType)
        .push(newCategory);

      this.categoryList.push(newCategory);
    }

    return this.categoryList;
  }
}
