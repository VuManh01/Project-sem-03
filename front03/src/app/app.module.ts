import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ProductComponent } from './components/product/product.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { ContactComponent } from './components/contact/contact.component';
import { LoginComponent } from './auth/login/login.component';
import { PlansComponent } from './components/plans/plans.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VanillaComponent } from './icecream-recipes/vanilla/vanilla.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { PaymentComponent } from './components/payment/payment.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { RecipesComponent } from './components/up-recipes/up-recipes.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    ProductComponent,
    GalleryComponent,
    ContactComponent,
    LoginComponent,
    PlansComponent,
    VanillaComponent,
     SignUpComponent,
     PaymentComponent,
     PageNotFoundComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    RecipesComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
