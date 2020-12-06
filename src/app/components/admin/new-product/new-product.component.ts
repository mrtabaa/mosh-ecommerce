import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit {
  constructor(private productService: ProductService) {
  }

  types: string[] = this.productService.types;

  getCategories(selectedType: string): string[] {
    return this.productService.getCategory(selectedType);
  }

  ngOnInit(): void {
  }

  onSubmit($event: Event): void {
    console.log($event);
    // this.productService.createProduct()
  }
}
