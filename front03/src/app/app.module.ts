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
import { ChocolateComponent } from './icecream-recipes/chocolate/chocolate.component';
import { ChocolateChipsComponent } from './icecream-recipes/chocolate-chips/chocolate-chips.component';
import { DessertComponent } from './components/dessert/dessert.component';
import { StrawberryComponent } from './icecream-recipes/strawberry/strawberry.component';
import { MangoComponent } from './icecream-recipes/mango/mango.component';
import { CoffeeComponent } from './icecream-recipes/coffee/coffee.component';
import { CherryComponent } from './icecream-recipes/cherry/cherry.component';
import { BlackCurrantComponent } from './icecream-recipes/black-currant/black-currant.component';
import { ButterscotchComponent } from './icecream-recipes/butterscotch/butterscotch.component';
import { WalnutComponent } from './icecream-recipes/walnut/walnut.component';
import { VaniNStrawComponent } from './icecream-recipes/vani-n-straw/vani-n-straw.component';
import { PistachioComponent } from './icecream-recipes/pistachio/pistachio.component';
import { BananaComponent } from './icecream-recipes/banana/banana.component';
import { BananChocolateChipComponent } from './icecream-recipes/banan-chocolate-chip/banan-chocolate-chip.component';
import { ChocolateAlmondComponent } from './icecream-recipes/chocolate-almond/chocolate-almond.component';
import { ChocolateTruffleComponent } from './icecream-recipes/chocolate-truffle/chocolate-truffle.component';
import { KiwiComponent } from './icecream-recipes/kiwi/kiwi.component';
import { PineappleComponent } from './icecream-recipes/pineapple/pineapple.component';
import { FruitAndNutComponent } from './icecream-recipes/fruit-and-nut/fruit-and-nut.component';
import { CashewCaramelCrunchComponent } from './icecream-recipes/cashew-caramel-crunch/cashew-caramel-crunch.component';

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
     ChocolateComponent,
     ChocolateChipsComponent,
     DessertComponent,
     StrawberryComponent,
     MangoComponent,
     CoffeeComponent,
     CherryComponent,
     BlackCurrantComponent,
     ButterscotchComponent,
     WalnutComponent,
     VaniNStrawComponent,
     PistachioComponent,
     BananaComponent,
     BananChocolateChipComponent,
     ChocolateAlmondComponent,
     ChocolateTruffleComponent,
     KiwiComponent,
     PineappleComponent,
     FruitAndNutComponent,
     CashewCaramelCrunchComponent,

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
