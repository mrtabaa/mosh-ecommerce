import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageOrdersComponent } from './components/admin/manage-orders/manage-orders.component';
import { ManageProductsComponent } from './components/admin/manage-products/manage-products.component';
import { NewProductComponent } from './components/admin/new-product/new-product.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NoAccessComponent } from './components/no-access/no-access.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin/manage-orders', component: ManageOrdersComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'admin/manage-products', component: ManageProductsComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'admin/new-product', component: NewProductComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'shopping-cart', component: ShoppingCartComponent, canActivate: [AuthGuard] },
  { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard] },
  { path: 'no-access', component: NoAccessComponent, canActivate: [AuthGuard] },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
