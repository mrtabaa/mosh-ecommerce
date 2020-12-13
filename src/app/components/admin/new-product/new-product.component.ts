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
  isAlreadyExist: boolean;
  types: string[];
  categories: string[];

  constructor(private newProductService: NewProductService) {
    this.types = this.newProductService.typesList;
  }

  addType(newTypeOnKeyup: HTMLInputElement): void {
    this.isAlreadyExist = this.newProductService.addType(newTypeOnKeyup.value); // add Type if it doesn't exist
    this.addedType = newTypeOnKeyup.value;
    newTypeOnKeyup.value = '';
    this.isAddedType = true;
    this.isAddedCategory = false;
  }

  getCategories(itemType: string): void {
    this.categories = this.newProductService.getCategory(itemType);
  }

  addCategory(newCategoryOnKeyup: HTMLInputElement, selectedType: string): void {
    this.newProductService.addCategory(newCategoryOnKeyup.value, selectedType);
    this.addedCategory = newCategoryOnKeyup.value;
    newCategoryOnKeyup.value = '';
    this.isAddedType = false;
    this.isAddedCategory = true;
  }

  ngOnInit(): void {
  }

  onSubmit($event: Product): void {
    this.newProductService.createProduct($event);
  }
}
