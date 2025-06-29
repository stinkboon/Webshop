import { Routes } from '@angular/router';

import { AuthGuard } from './core/services/authGuard';
import { PlatformComponent } from './platform/platform.component';
import { AuthLayoutComponent } from './authentication/auth-layout/auth.layout.component';
import { DashboardComponent } from './platform/dashboard/dashboard.component';
import { CategoryComponent } from './platform/category/category.component';

// Products
import { ProductComponent } from './platform/products/products.component';
import { ProductCreateComponent } from './platform/products/product-create/product-create.component';
import { ProductViewComponent } from './platform/products/product-view/product-view.component';
import { ProductUpdateComponent } from './platform/products/product-update/product-update.component';

// Clients
import { CustomerComponent } from './platform/clients/clients.component';
import { CustomerCreateComponent } from './platform/clients/client-create/client-create.component';
import { CustomerUpdateComponent } from './platform/clients/client-update/client-update.component';
import { CustomerViewComponent } from './platform/clients/client-view/client-view.component';


export const routes: Routes = [

  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', loadComponent: () => import('./authentication/login/login.component').then(m => m.LoginComponent) },
      { path: 'register', loadComponent: () => import('./authentication/register/register.component').then(m => m.RegisterComponent) },
      { path: 'forgot-password', loadComponent: () => import('./authentication/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent) },
      { path: 'reset-password', loadComponent: () => import('./authentication/reset-password/reset-password.component').then(m => m.ResetPasswordComponent) },
    ]
  },


  {
    path: 'platform',
    component: PlatformComponent,
    canActivate: [AuthGuard],
    children: [

      { path: 'dashboard', component: DashboardComponent },

      // products
      {
        path: 'products',
        children: [
          { path: '', component: ProductComponent },
          { path: 'create', component: ProductCreateComponent },
          { path: 'edit/:id', component: ProductUpdateComponent },
          { path: ':id', component: ProductViewComponent }]
      },

      // Clients
      {
        path: 'clients',
        children: [
          { path: '', component: CustomerComponent },
          { path: 'create', component: CustomerCreateComponent },
          { path: 'edit/:id', component: CustomerUpdateComponent },
          { path: ':id', component: CustomerViewComponent }]
      }
    ]
  },

  { path: 'platform/category', component: CategoryComponent },

  { path: '**', redirectTo: '/login' }
];
