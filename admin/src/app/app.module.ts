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
import {QuillModule} from "ngx-quill";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RecipesComponent,
    UsersComponent,
    OrderComponent,
    FeedbacksComponent,
    NewRecipeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    QuillModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
