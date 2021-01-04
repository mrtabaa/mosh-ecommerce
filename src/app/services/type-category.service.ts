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

  addType(newType: string): void {
    newType = newType.toLowerCase();
    this.db.list<string>('/typeAndCategory/' + newType)
      .push('');
    this.typesList.push(newType);
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

  async addCategory(newCategory: string, selectedType: string): Promise<string[]> {
    newCategory = newCategory.toLowerCase();
    selectedType = selectedType.toLowerCase();

    if (!this.categoryList.includes(newCategory)) {
      await this.db.list<string>('/typeAndCategory/' + selectedType)
        .push(newCategory);

      this.categoryList.push(newCategory);
    }
    console.log(this.categoryList);
    return this.categoryList;
  }
}
