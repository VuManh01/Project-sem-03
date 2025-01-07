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

const routes: Routes = [
  {path : '', component : HomeComponent,data: { animation: 'HomePage' }},
  {path : 'about', component : AboutComponent,data: { animation: 'AboutPage' }},
  {path : 'product', component : ProductComponent},
  {path : 'gallery', component : GalleryComponent},
  {path : 'contact', component : ContactComponent},
  {path : 'login', component : LoginComponent},
  {path : 'plans', component : PlansComponent},
  {path : 'vanilla', component : VanillaComponent},
  {path : 'signup/:id', component : SignUpComponent},
  {path : 'payment', component : PaymentComponent},
  {path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
