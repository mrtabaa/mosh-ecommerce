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
import { NewProductService } from './services/newProduct.service';

import { ErrorStateMatcher } from '@angular/material/core';
import { TouchedErrorStateMatcher } from './common/validators/touched-error-state.matcher';

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
    { provide: ErrorStateMatcher, useClass: TouchedErrorStateMatcher }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
