import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { NewProductService } from 'src/app/services/newProduct.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit {
  constructor(private newProductService: NewProductService) {
  }

  types: string[] = this.newProductService.types;
  selectedType: string;

  getCategories(selectedType: string): string[] {
    return this.newProductService.getCategory(selectedType);
  }

  addType(newTypeEntered: string): void {
    this.newProductService.addType(newTypeEntered);
  }

  addCategory(newCategory: string, selectedType: string): void {
    this.newProductService.addCategory(newCategory, selectedType);
  }

  ngOnInit(): void {
  }

  onSubmit($event: Product): void {
    console.log($event);
    this.newProductService.createProduct($event);
  }
}
