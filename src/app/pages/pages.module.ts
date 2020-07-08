import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { PAGES_ROUTES } from './pages.routes';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [PagesComponent, DashboardComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    PAGES_ROUTES
  ]
})
export class PagesModule { }
