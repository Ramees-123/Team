import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login/login-page.component';
import { HomePageComponent } from './pages/home/home-page.component';

export const routes: Routes = [
  { path: '', component: LoginPageComponent },
  { path: 'home', component: HomePageComponent },
  { path: '**', redirectTo: '' }
];