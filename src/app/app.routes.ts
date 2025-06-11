import { Routes } from '@angular/router';
import { ProductComponent } from './platform/products/products.component';
import { ProductCreateComponent } from './platform/products/product-create/product-create.component';
import { ProductViewComponent } from './platform/products/product-view/product-view.component';
import { ProductUpdateComponent } from './platform/products/product-update/product-update.component';
import { CategoryComponent } from './platform/category/category.component';
import { ClientsComponent } from './platform/clients/clients.component';
import { DashboardComponent } from './platform/dashboard/dashboard.component';  // adjust path if needed

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },  // default route
  { path: 'dashboard', component: DashboardComponent },      // dashboard route
  { path: 'products', component: ProductComponent },
  { path: 'products/create', component: ProductCreateComponent },
  { path: 'products/edit/:id', component: ProductUpdateComponent },
  { path: 'products/:id', component: ProductViewComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'clients', component: ClientsComponent },
  { path: '**', redirectTo: 'dashboard' }  // wildcard route fallback
];
