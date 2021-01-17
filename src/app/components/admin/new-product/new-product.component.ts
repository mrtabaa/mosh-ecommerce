import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClickErrorStateMatcher } from 'src/app/common/validators/click-error-state.matcher';
import { Product } from 'src/app/models/product.model';
import { NewProductService } from 'src/app/services/new-product.service';
import { TypeCategoryService } from 'src/app/services/type-category.service';
import { NewProductValidators } from './helpers/new-product.validator';
import { NewCategoryErrorStateMatcher } from './helpers/new-product-error-state.matcher';
import { MatSelectChange } from '@angular/material/select';
import { throwError } from 'rxjs';

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

  isSubmitFail: boolean;
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
      title: ['', [Validators.required, Validators.minLength(2)]],
      price: ['', [Validators.required, NewProductValidators.checkPrice]],
      imageUrl: ['', [
        Validators.required,
        Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')
      ]],

      newType: ['', {
        validators: [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern(/[a-z&A-Z&0-9&-]/),
          NewProductValidators.checkUniqueType(this.types),
        ],
        asyncValidators: [],
        updateOn: 'change'
      }],

      newCategoryGroup: this.fb.group({
        newCategory: ['', {
          validators: [
            Validators.required,
            Validators.minLength(2),
            Validators.pattern(/[a-z&A-Z&0-9&-]/),
          ]
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
    console.log(selectedType.source);
    if (selectedType.value) {
      this.Category.setValue(null);
      this.AddedCategory.setValue(null);
      this.categories = this.typeCategoryService.getCategory(selectedType.value);
      this.CategoriesCtrl.setValue(this.categories); // for validation
      this.AddedType.reset();
      this.AddedCategory.reset();
      this.isSubmitFail = null;
    }
  }

  addType(): void {
    const newItem = this.NewType.value.trim();

    if (this.NewType.valid) {
      this.typeCategoryService.addType(newItem);

      this.AddedType.setValue(newItem);
      this.Type.setValue(newItem);
      this.NewType.reset();
      this.AddedCategory.reset();
      this.Category.reset();
      this.categories = [];
    }
  }

  addCategory(): void {
    const newItem = this.NewCategory.value.trim();

    if (this.NewCategoryGroup.valid) {
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

  compareFn(x: string, y: string): boolean {
    return x && y ? x === y : x === y;
  }

  onSubmit($event: Product): void {
    // double-check if all required values are entered successfully before creating a product on database.
    if (!this.form.hasError('invalidForm')) {
      this.isSubmitFail = null;
      this.newProductService.createProduct($event);
    }
    else {
      this.isSubmitFail = true;
    }
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
