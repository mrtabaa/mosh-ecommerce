import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClickErrorStateMatcher } from 'src/app/common/validators/click-error-state.matcher';
import { Product } from 'src/app/models/product.model';
import { NewProductService } from 'src/app/services/new-product.service';
import { TypeCategoryService } from 'src/app/services/type-category.service';
import { NewProductValidators } from './helpers/new-product.validator';
import { NewCategoryErrorStateMatcher } from './helpers/new-product-error-state.matcher';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit {
  //#region variables and objects
  form: FormGroup;
  clickErrorMatcher = new ClickErrorStateMatcher();
  categoryExistErrorStateMatcher = new NewCategoryErrorStateMatcher();

  types: string[];
  categories: string[];
  selectedType: string;
  //#endregion

  constructor(
    private typeCategoryService: TypeCategoryService,
    private newProductService: NewProductService,
    private fb: FormBuilder) {
    this.types = this.typeCategoryService.typesList; // get types
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      type: ['', Validators.required],
      category: ['', Validators.required],
      title: ['', [Validators.required, Validators.pattern(/\S/g)]],
      price: ['', [Validators.required, Validators.pattern('0.00')]],
      imageUrl: ['', [
        Validators.required,
        Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')
      ]],

      newType: ['', {
        validators: [
          Validators.required,
          Validators.pattern(/\S/g),
          NewProductValidators.checkUniqueType(this.types),
          NewProductValidators.checkNewTypeCategoryAdded,
        ],
        asyncValidators: [],
        updateOn: 'change'
      }],

      newCategoryGroup: this.fb.group({
        newCategory: ['',
          {
            validators: [
              Validators.required,
              Validators.pattern(/\S/g),
              NewProductValidators.checkNewTypeCategoryAdded]
          }],
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

  getCategories(selectedType: MatSelectChange): void {
    if (selectedType.value) {
      this.Category.setValue(null);
      this.AddedCategory.setValue(null);
      this.categories = this.typeCategoryService.getCategory(selectedType.value);
      this.CategoriesCtrl.setValue(this.categories); // for validation
    }
  }

  addType(): void {
    const value = this.NewType.value as string;

    if (value === '/\s/g' || this.NewType.hasError('newItemNotAdded') || !this.NewType.hasError('uniqueType')) {
      this.typeCategoryService.addType(value); // add Type if it doesn't exist
      this.AddedType.setValue(value);
      this.Type.setValue(value);
      this.NewType.setValue('');
      this.NewType.markAsPristine();
      this.categories = [];
    }
  }

  addCategory(): void {
    const newItem = this.NewCategory.value.trim();
    if (
      newItem !== ' '
      && this.NewCategory.hasError('newItemNotAdded')
      && !this.NewCategoryGroup.hasError('uniqueCategory')
    ) {
      this.categories = [];
      this.typeCategoryService.addCategory(newItem, this.Type.value)
        .then(catList => {
          this.CategoriesCtrl.setValue(catList);
          this.categories = catList;
        });

      this.Category.setValue(newItem);
      this.AddedCategory.setValue(newItem);
      this.NewCategory.setValue(null);
      this.NewCategory.setErrors(null);
      this.NewCategoryGroup.setErrors(null);
    }
  }

  onSubmit($event: Product): void {
    this.newProductService.createProduct($event);
  }

  //#region get FORM controls
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
  //#endregion
}
