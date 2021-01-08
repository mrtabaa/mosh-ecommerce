import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ClickErrorStateMatcher } from 'src/app/common/validators/click-error-state.matcher';
import { Product } from 'src/app/models/product.model';
import { NewProductService } from 'src/app/services/new-product.service';
import { TypeCategoryService } from 'src/app/services/type-category.service';
import { NewProductValidators } from './new-product.validator';
import { NewCategoryErrorStateMatcher } from './new-product-error-state.matcher';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit {
  form: FormGroup;
  clickErrorMatcher = new ClickErrorStateMatcher();
  categoryExistErrorStateMatcher = new NewCategoryErrorStateMatcher();

  types: string[];
  categories: string[];

  constructor(
    private typeCategoryService: TypeCategoryService,
    private newProductService: NewProductService,
    private fb: FormBuilder) {
    this.types = this.typeCategoryService.typesList; // get types
  }

  printError(): void {
    console.log(this.form);
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      type: ['', Validators.required],
      category: ['', Validators.required],
      title: ['', Validators.required],
      price: ['', Validators.required],
      imageUrl: ['', Validators.required],

      newType: ['', {
        validators: [
          Validators.required,
          NewProductValidators.checkUniqueType(this.types),
          NewProductValidators.checkNewTypeCategoryAdded,
        ],
        asyncValidators: [],
        updateOn: 'change'
      }],

      newCategoryGroup: this.fb.group({
        newCategory: ['', [Validators.required, NewProductValidators.checkNewTypeCategoryAdded]],
        categoriesCtrl: [],
      },
        { validators: [NewProductValidators.checkUniqueCategory] }
      ),

      addedType: [],
      addedCategory: []
    },
      {
        validators: [
          NewProductValidators.validateForm,
          NewProductValidators.checkNoTypeSelectedCategory
        ],
        asyncValidators: [],
        updateOn: 'change'
      });
  }

  getCategories(itemType?: string): void {
    this.Category.setValue(null);
    this.categories = this.typeCategoryService.getCategory(itemType);

    this.CategoriesCtrl.setValue(this.categories);
  }

  addType(inputType: HTMLInputElement): void {
    if (this.NewType.hasError('newItemNotAdded') && !this.NewType.hasError('uniqueType')) {
      this.typeCategoryService.addType(inputType.value); // add Type if it doesn't exist
      this.AddedType.setValue(inputType.value);
      this.Type.setValue(inputType.value);
      this.NewType.setValue('');
      this.NewType.markAsPristine();
    }
  }

  addCategory(newCategoryInput: HTMLInputElement, selectedType: string): void {
    if (this.NewCategory.hasError('newItemNotAdded') && !this.NewCategoryGroup.hasError('uniqueCategory')) {
      this.categories = [];
      this.typeCategoryService.addCategory(newCategoryInput.value, selectedType)
        .then(catList => {
          this.CategoriesCtrl.setValue(catList);
          this.categories = catList;
        });

      this.Category.setValue(this.NewCategory.value);
      this.NewCategory.setValue(null);
      this.NewCategory.setErrors(null);
      this.NewCategoryGroup.setErrors(null);
    }
  }

  resetCategory(): void {
    this.categories = [];
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
    return this.form.get('newCategoryGroup.newCategory');
  }
  get CategoriesCtrl(): AbstractControl {
    return this.form.get('newCategoryGroup.categoriesCtrl');
  }
  get NewCategoryGroup(): AbstractControl {
    return this.form.get('newCategoryGroup');
  }

  get AddedType(): AbstractControl {
    return this.form.get('addedType');
  }
  get AddedCategory(): AbstractControl {
    return this.form.get('addedCategory');
  }
}
