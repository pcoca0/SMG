import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PagesComponent } from './pages/pages.component';
import { CategoryComponent } from './pages/category/category.component';
import { LoginComponent } from './login/login.component';

const routes: Routes =[
  {path: 'login', component: LoginComponent },
  {
    path: 'gestion', loadChildren: () =>
    import('./pages/pages.module').then(m => m.PagesModule)
  },
  // { path: 'login', component: LoginComponent },
  // { path: 'register', component: RegisterComponent },
  // { path: '**', component: NotFoundComponent }
  { path: '', redirectTo: 'login', pathMatch: 'full' }

  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
