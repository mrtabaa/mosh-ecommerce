import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  hide = true;
  categories = ['Bread', 'Bevrage', 'Milk'];
  selectedValue: string;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit($event: Event): void {
  }
}
