import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from 'src/app/signup/signup.component';
import { SearchComponent } from 'src/app/players/search/search.component';
import { ManagefavouritesComponent } from 'src/app/players/managefavourites/managefavourites.component';
import { AppComponent } from 'src/app/app.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: SignupComponent },
  { path: 'players/search', component: SearchComponent },
  { path: 'players/managefavourite', component: ManagefavouritesComponent },
  { path: '**', component: AppComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 
