import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { NotFound } from './pages/not-found/not-found';
import { Register } from './pages/register/register';
import { Products } from './pages/products/products';
import path from 'path';
import { Cart } from './pages/cart/cart';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    {path:'', redirectTo:"home", pathMatch:"full"},
    {path:'home', component:Home, title:"Home"},
    {path:'products', component:Products, title:"Products"},
    {path:'login', component:Login, title:"Login"},
    {path:'register', component:Register, title:"Register"},
    {path:'cart', component:Cart, title:"Cart"},
    {path:'**', component:NotFound, title:"Page not found"},

];
