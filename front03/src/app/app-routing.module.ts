import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ProductComponent } from './components/product/product.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { ContactComponent } from './components/contact/contact.component';
import { LoginComponent } from './auth/login/login.component';
import { PlansComponent } from './components/plans/plans.component';
import { VanillaComponent } from './icecream-recipes/vanilla/vanilla.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { PaymentComponent } from './components/payment/payment.component';
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import { RecipesComponent } from './components/up-recipes/up-recipes.component';
import { ChocolateComponent } from './icecream-recipes/chocolate/chocolate.component';
import { ChocolateChipsComponent } from './icecream-recipes/chocolate-chips/chocolate-chips.component';
import { DessertComponent } from './components/dessert/dessert.component';
import { StrawberryComponent } from './icecream-recipes/strawberry/strawberry.component';
import { MangoComponent } from './icecream-recipes/mango/mango.component';
import { CoffeeComponent } from './icecream-recipes/coffee/coffee.component';
import { BlackCurrantComponent } from './icecream-recipes/black-currant/black-currant.component';
import { CherryComponent } from './icecream-recipes/cherry/cherry.component';
import { ButterscotchComponent } from './icecream-recipes/butterscotch/butterscotch.component';
import { WalnutComponent } from './icecream-recipes/walnut/walnut.component';
import { VaniNStrawComponent } from './icecream-recipes/vani-n-straw/vani-n-straw.component';
import { BananaComponent } from './icecream-recipes/banana/banana.component';
import { BananChocolateChipComponent } from './icecream-recipes/banan-chocolate-chip/banan-chocolate-chip.component';
import { ChocolateAlmondComponent } from './icecream-recipes/chocolate-almond/chocolate-almond.component';
import { ChocolateTruffleComponent } from './icecream-recipes/chocolate-truffle/chocolate-truffle.component';
import { KiwiComponent } from './icecream-recipes/kiwi/kiwi.component';
import { PineappleComponent } from './icecream-recipes/pineapple/pineapple.component';
import { PistachioComponent } from './icecream-recipes/pistachio/pistachio.component';
import { LogRestricComponent } from './components/log-restric/log-restric.component';

const routes: Routes = [
  {path : '', component : HomeComponent,data: { animation: 'HomePage' }},
  {path : 'about', component : AboutComponent,data: { animation: 'AboutPage' }},
  {path : 'recipes', component : ProductComponent},
  {path : 'gallery', component : GalleryComponent},
  {path : 'contact', component : ContactComponent},
  {path : 'login', component : LoginComponent},
  {path : 'plans', component : PlansComponent},
  {path : 'vanilla', component : VanillaComponent},
  {path : 'signup/:id', component : SignUpComponent},
  {path : 'payment', component : PaymentComponent},
  {path : 'up-recipes', component : RecipesComponent},
  {path : 'choco', component : ChocolateComponent},
  {path : 'chocos', component : ChocolateChipsComponent},
  {path : 'dessert', component : DessertComponent},
  {path : 'straw', component : StrawberryComponent},
  {path : 'mango', component : MangoComponent},
  {path : 'coffee', component : CoffeeComponent},
  {path : 'black-currant', component : BlackCurrantComponent},
  {path : 'cherry', component : CherryComponent},
  {path : 'butter', component : ButterscotchComponent},
  {path : 'walnut', component : WalnutComponent},
  {path : 'vaninstraw', component : VaniNStrawComponent},
  {path : 'banana', component : BananaComponent},
  {path : 'banana-chips', component : BananChocolateChipComponent},
  {path : 'chocoalmon', component : ChocolateAlmondComponent},
  {path : 'chocotruffle', component : ChocolateTruffleComponent},
  {path : 'pista', component : PistachioComponent},
  {path : 'kiwi', component : KiwiComponent},
  {path : 'pine', component : PineappleComponent},
  {path : 'res', component : LogRestricComponent},
  {path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
