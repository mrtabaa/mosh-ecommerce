import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentModule } from './added-modules/component.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from 'src/environments/environment.prod';

import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { NewProductService } from './services/new-product.service';

import { ErrorStateMatcher } from '@angular/material/core';
import { DefaultErrorStateMatcher } from './common/validators/default-error-state.matcher';
import { TypeCategoryService } from './services/type-category.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    ComponentModule, // Contains:
    // Components, BrowserAnimationsModule, ReactiveFormsModule, MaterialModule, FlexLayoutModule

    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
  ],
  providers: [
    AuthService,
    UserService,
    NewProductService,
    TypeCategoryService,
    { provide: ErrorStateMatcher, useClass: DefaultErrorStateMatcher }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
