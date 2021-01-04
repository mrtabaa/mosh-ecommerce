import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/models/product.model';
import { NewProductService } from 'src/app/services/new-product.service';
import { TypeCategoryService } from 'src/app/services/type-category.service';
import { TypeCategoryValidators } from './validators/type-category.validator';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit {
  form: FormGroup;

  types: string[];
  categories: string[];

  constructor(
    private typeCategoryService: TypeCategoryService,
    private newProductService: NewProductService,
    private fb: FormBuilder) {
    this.types = this.typeCategoryService.typesList; // get types
  }

  getCategories(itemType: string): string[] {
    this.Category.setValue(null);
    return this.categories = this.typeCategoryService.getCategory(itemType);
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      type: [],
      category: [],
      title: [],
      price: [],
      imageUrl: [],

      newType: ['', {
        validators: [TypeCategoryValidators.checkUniqueType(this.types)],
        asyncValidators: [],
        updateOn: 'change'
      }],
      newCategory: [],
      addedType: [],
      addedCategory: []
    });
  }

  addType(type: HTMLInputElement): void {
    if (this.NewType.valid) {
      this.typeCategoryService.addType(type.value); // add Type if it doesn't exist
      this.AddedType.setValue(type.value);
      this.Type.setValue(type.value);
      this.NewType.setValue('');
      this.NewType.markAsPristine();
    }
  }

  addCategory(newCategoryInput: HTMLInputElement, selectedType: string): void {
    this.typeCategoryService.addCategory(newCategoryInput.value, selectedType)
      .then(catList => this.categories = catList);
  }

  onSubmit($event: Product): void {
    this.newProductService.createProduct($event);
  }

  // FORM
  get Type(): AbstractControl {
    return this.form.get('type');
  }
  get Category(): AbstractControl {
    return this.form.get('category');
  }
  get Title(): AbstractControl {
    return this.form.get('title');
  }
  get Price(): AbstractControl {
    return this.form.get('price');
  }
  get ImageUrl(): AbstractControl {
    return this.form.get('imageUrl');
  }

  get NewType(): AbstractControl {
    return this.form.get('newType');
  }
  get NewCategory(): AbstractControl {
    return this.form.get('newCategory');
  }
  get AddedType(): AbstractControl {
    return this.form.get('addedType');
  }
  get AddedCategory(): AbstractControl {
    return this.form.get('addedCategory');
  }
}
