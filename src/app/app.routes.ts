import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AdminLoginComponent } from './admin/login/admin-login.component';
import { AdminShellComponent } from './admin/shell/admin-shell.component';
import { AdminProductsComponent } from './admin/products/admin-products.component';
import { AdminCategoriesComponent } from './admin/categories/admin-categories.component';
import { AdminOrdersComponent } from './admin/orders/admin-orders.component';
import { AdminCourierComponent } from './admin/courier/admin-courier.component';
import { adminGuard, adminLoginGuard } from './admin/admin-auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'admin/login', component: AdminLoginComponent, canActivate: [adminLoginGuard] },
  {
    path: 'admin',
    component: AdminShellComponent,
    canActivate: [adminGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'products' },
      { path: 'products', component: AdminProductsComponent },
      { path: 'categories', component: AdminCategoriesComponent },
      { path: 'orders', component: AdminOrdersComponent },
      { path: 'courier', component: AdminCourierComponent },
    ],
  },
  { path: '**', redirectTo: '' },
];
