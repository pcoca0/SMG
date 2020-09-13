import { PagesComponent } from './pages.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';
import { BudgetComponent } from './budget/budget.component';
import { AddBudgetComponent } from './add-budget/add-budget.component';
import { ClientComponent } from './client/client.component';
import { ReportBudgetComponent } from './report-budget/report-budget.component';
import { AuthGuardService as guard } from '../core/guards/auth-guard.service';
import { VendorComponent } from './vendor/vendor.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { AddInvoiceComponent } from './add-invoice/add-invoice.component';

const pagesRoutes: Routes = [
    {
        path: '', component: PagesComponent,
        children: [
          {path: '', component: DashboardComponent},
          {path: 'categorias',  component: CategoryComponent, canActivate: [guard], data: {expectedRol: ['admin']} },
          {path: 'productos',   component: ProductComponent },
          {path: 'presupuestos',   component: BudgetComponent, canActivate: [guard], data: {expectedRol: ['admin', 'user']}},
          {path: 'crearPresupuesto',   component: AddBudgetComponent },
          {path: 'editarPresupuesto/:id',   component: AddBudgetComponent, canActivate: [guard], data: {expectedRol: ['admin', 'user']}  },
          {path: 'imprimirPresupuesto/:id',   component: ReportBudgetComponent },
          {path: 'clientes',   component: ClientComponent },
          {path: 'proveedores',   component: VendorComponent },
          {path: 'facturas',   component: InvoiceComponent, canActivate: [guard], data: {expectedRol: ['admin', 'user']}},
          {path: 'crearFactura',   component: AddInvoiceComponent },
          {path: 'editarFactura/:id',   component: AddInvoiceComponent, canActivate: [guard], data: {expectedRol: ['admin', 'user']}  },


          // {path: 'categorias',  component: ProductComponent },
          //   {path: 'graficas',  component: Graficas1Component },
        //   {path: 'account-settings',  component: AccountSettingsComponent },

          {path: '', redirectTo: '/dashboard', pathMatch: 'full'},

        ]
    },
    ];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes)
