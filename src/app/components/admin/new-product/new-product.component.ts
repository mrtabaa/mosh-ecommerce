import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductTypeCategory } from 'src/app/models/ProductTypes';
import { NewProductService } from 'src/app/services/newProduct.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit {
  tempType: string;
  addedType: string;
  addedCategory: string;
  isAddedType: boolean;
  isAddedCategory: boolean;

  types$: Observable<ProductTypeCategory[]>;
  categories$: Observable<ProductTypeCategory[]>;

  constructor(private newProductService: NewProductService) {
  }

  addType(newTypeOnKeyup: HTMLInputElement): void {
    this.newProductService.addType(newTypeOnKeyup.value);
    this.addedType = newTypeOnKeyup.value;
    newTypeOnKeyup.value = '';
    this.isAddedType = true;
    this.isAddedCategory = false;
  }

  getCategories(itemType: string): void {
    this.categories$ = this.newProductService.getCategory(itemType);
  }

  addCategory(newCategoryOnKeyup: HTMLInputElement, selectedType: string): void {
    this.newProductService.addCategory(newCategoryOnKeyup.value, selectedType);
    this.addedCategory = newCategoryOnKeyup.value;
    newCategoryOnKeyup.value = '';
    this.isAddedType = false;
    this.isAddedCategory = true;
  }

  ngOnInit(): void {
    this.types$ = this.newProductService.getTypes();
  }

  onSubmit($event: Product): void {
    this.newProductService.createProduct($event);
  }
}
