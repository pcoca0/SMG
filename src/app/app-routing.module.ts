import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PagesComponent } from './pages/pages.component';

const routes: Routes =[
  {
      path: '',
      component: PagesComponent,
      children: [
        {path: 'dashboard', component: DashboardComponent},
        // {path: 'progress',  component: ProgressComponent },
        // {path: 'graficas',  component: Graficas1Component },
        {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
      ]
  },
  // { path: 'login', component: LoginComponent },
  // { path: 'register', component: RegisterComponent },
  // { path: '**', component: NotFoundComponent }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
