import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { UsersComponent } from './components/users/users.component';
import { FeedbacksComponent } from './components/feedbacks/feedbacks.component';
import { OrderComponent } from './components/order/order.component';

const routes: Routes = [{path : '', component : HomeComponent},
  {path : 'login', component : LoginComponent},
  {path : 'recipes', component : RecipesComponent},
  {path : 'users', component : UsersComponent},
  {path : 'feedbacks', component : FeedbacksComponent},
  {path : 'orders', component : OrderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
