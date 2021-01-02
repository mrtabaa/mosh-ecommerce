import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductTypeCategory } from 'src/app/models/ProductTypes';
import { NewProductService } from 'src/app/services/newProduct.service';
import { TypeValidator } from './validators/type.validator';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit {
  form: FormGroup;

  isTypeAdded: boolean;
  isCategoryAdded: boolean;
  isCategoryExist$: Observable<boolean>;
  types: string[];
  categories$: Observable<ProductTypeCategory[]>;

  constructor(private newProductService: NewProductService, private fb: FormBuilder) {
    // get types
    this.types = this.newProductService.typesList;
  }

  getCategories(itemType: string): void {
    this.categories$ = this.newProductService.getCategory(itemType);
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      type: [],
      category: [],
      title: [],
      price: [],
      imageUrl: [],

      newType: ['', {
        validators: [TypeValidator.checkUniqueType(this.types)],
        asyncValidators: [],
        updateOn: 'change'
      }],
      newCategory: [],
    });
  }

  addType(type: HTMLInputElement): void {
    if (this.NewType.valid) {
      this.newProductService.addType(type.value); // add Type if it doesn't exist
      this.Type.setValue(type.value);
      this.isTypeAdded = true;
      this.isCategoryAdded = false;
    }
    else {
      this.isTypeAdded = false;
    }
  }

  addCategory(newCategoryOnKeyup: HTMLInputElement, selectedType: string): void {
    // this.newProductService.addCategory(newCategoryOnKeyup.value, selectedType);
    // this.isAddedType = false;
    // this.isAddedCategory = true;
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
}
