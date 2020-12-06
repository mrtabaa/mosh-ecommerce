import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit {
  hide = true;
  categories = ['Bread', 'Bevrage', 'Milk'];
  selectedValue: string;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
  }

  onSubmit($event: Event): void {
    // this.productService($event.)
  }
}


