import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.scss']
})
export class ManageProductsComponent implements OnInit {
  hide = true;
  categories = ['Bread', 'Bevrage', 'Milk'];
  selectedValue: string;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit($event: Event): void {
  }
}
