import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { NavbarComponent } from '../components/navbar/navbar.component';
import { HomeComponent } from '../components/home/home.component';
import { LoginComponent } from '../components/login/login.component';
import { ManageOrdersComponent } from '../components/admin/manage-orders/manage-orders.component';
import { ManageProductsComponent } from '../components/admin/manage-products/manage-products.component';
import { NewProductComponent } from '../components/admin/new-product/new-product.component';
import { OrdersComponent } from '../components/orders/orders.component';
import { ShoppingCartComponent } from '../components/shopping-cart/shopping-cart.component';
import { CheckoutComponent } from '../components/checkout/checkout.component';
import { NoAccessComponent } from '../components/no-access/no-access.component';
import { NotFoundComponent } from '../components/not-found/not-found.component';

const components = [
  ManageOrdersComponent,
  ManageProductsComponent,
  NewProductComponent,
  CheckoutComponent,
  HomeComponent,
  LoginComponent,
  NavbarComponent,
  NoAccessComponent,
  NotFoundComponent,
  OrdersComponent,
  ShoppingCartComponent
];

@NgModule({
  declarations: [components],
  imports: [
    CommonModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    FlexLayoutModule
  ],
  exports: [components]
})
export class ComponentModule { }
