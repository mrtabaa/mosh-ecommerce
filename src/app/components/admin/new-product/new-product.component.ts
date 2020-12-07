import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit {
  constructor(private productService: ProductService) {
  }

  isSubmitted = true;

  types: string[] = this.productService.types;

  getCategories(selectedType: string): string[] {
    return this.productService.getCategory(selectedType);
  }

  ngOnInit(): void {
  }

  onSubmit($event: Product): void {
    console.log($event);
    this.productService.createProduct($event);
    this.isSubmitted = !this.isSubmitted; // disable button if form submitted
  }
}
