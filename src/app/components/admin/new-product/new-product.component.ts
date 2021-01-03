import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Product } from 'src/app/models/product.model';
import { NewProductService } from 'src/app/services/newProduct.service';
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

  constructor(private newProductService: NewProductService, private fb: FormBuilder) {
    this.types = this.newProductService.typesList; // get types
  }

  getCategories(itemType: string): string[] {
    this.Category.setValue(null);
    return this.categories = this.newProductService.getCategory(itemType);
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
      this.newProductService.addType(type.value); // add Type if it doesn't exist
      this.AddedType.setValue(type.value);
      this.Type.setValue(type.value);
      this.NewType.setValue('');
      this.NewType.markAsPristine();
    }
  }

  addCategory(newCategoryOnKeyup: HTMLInputElement, selectedType: string): void {
    this.newProductService.addCategory(newCategoryOnKeyup.value, selectedType);
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
