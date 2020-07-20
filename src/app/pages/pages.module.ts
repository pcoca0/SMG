import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { PAGES_ROUTES } from './pages.routes';
import { RouterModule } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';
import { BudgetComponent } from './budget/budget.component';
import { AddBudgetComponent } from './add-budget/add-budget.component';

@NgModule({
  declarations: [PagesComponent, DashboardComponent, CategoryComponent, ProductComponent, BudgetComponent, AddBudgetComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    PAGES_ROUTES
  ]
})
export class PagesModule { }
