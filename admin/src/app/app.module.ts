import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { UsersComponent } from './components/users/users.component';
import { OrderComponent } from './components/order/order.component';
import { FeedbacksComponent } from './components/feedbacks/feedbacks.component';
import { NewRecipeComponent } from './components/new-recipe/new-recipe.component';
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    UsersComponent,
    OrderComponent,
    FeedbacksComponent,
    NewRecipeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CKEditorModule,
    RecipesComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
