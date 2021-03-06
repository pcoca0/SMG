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
import { AddProductComponent } from './add-product/add-product.component';
import { VendorInvoiceComponent } from './vendor-invoice/vendor-invoice.component';
import { AddVendorInvoiceComponent } from './add-vendor-invoice/add-vendor-invoice.component';
import { AddVendorInvoiceSpendComponent } from './add-vendor-invoice-spend/add-vendor-invoice-spend.component';
import { CheckComponent } from './check/check.component';
import { PayOrdersComponent } from './pay-orders/pay-orders.component';
import { AddPayOrdersComponent } from './add-pay-orders/add-pay-orders.component';
import { AddBillComponent } from './add-bill/add-bill.component';
import { BillComponent } from './bill/bill.component';
import { TrackComponent } from './track/track.component';
import { TrackingViewComponent } from './tracking-view/tracking-view.component';
import { ClientMovementComponent } from './client-movement/client-movement.component';
import { VendorMovementComponent } from './vendor-movement/vendor-movement.component';

const pagesRoutes: Routes = [
    {
        path: '', component: PagesComponent,
        children: [
          {path: '', component: DashboardComponent},
          {path: 'categorias',  component: CategoryComponent, canActivate: [guard], data: {expectedRol: ['admin']} },
          {path: 'productos',   component: ProductComponent },
          {path: 'seguimientoProducto/:idProducto',   component: TrackComponent, canActivate: [guard], data: {expectedRol: ['admin', 'user']}  },
          {path: 'cuentaCorriente/:id',   component: ClientMovementComponent, canActivate: [guard], data: {expectedRol: ['admin', 'user']}  },

          {path: 'cheques',   component: CheckComponent },
          {path: 'seguimientos',   component: TrackingViewComponent },


          {path: 'agregrarProducto',   component: AddProductComponent },
          {path: 'presupuestos',   component: BudgetComponent, canActivate: [guard], data: {expectedRol: ['admin', 'user']}},
          {path: 'crearPresupuesto',   component: AddBudgetComponent },
          {path: 'editarPresupuesto/:id',   component: AddBudgetComponent, canActivate: [guard], data: {expectedRol: ['admin', 'user']}  },
          {path: 'imprimirPresupuesto/:id',   component: ReportBudgetComponent },
          {path: 'clientes',   component: ClientComponent },

          {path: 'proveedores',   component: VendorComponent },
          {path: 'facturasProveedores',   component: VendorInvoiceComponent },
          {path: 'cargarFacturaProveedor',   component: AddVendorInvoiceComponent },
          {path: 'editarFacturaProveedor/:id',   component: AddVendorInvoiceComponent },
          {path: 'ordenesDePago/:id',   component: PayOrdersComponent, canActivate: [guard], data: {expectedRol: ['admin', 'user']}  },
          {path: 'crearOrdenDePago/:idProveedor',   component: AddPayOrdersComponent, canActivate: [guard], data: {expectedRol: ['admin', 'user']}  },
          {path: 'editarOrdenDePago/:id',   component: AddPayOrdersComponent, canActivate: [guard], data: {expectedRol: ['admin', 'user']}  },
          {path: 'cuentaCorrienteProveedor/:id',   component:VendorMovementComponent, canActivate: [guard], data: {expectedRol: ['admin', 'user']}  },


          {path: 'cargarGastoProveedor',   component: AddVendorInvoiceSpendComponent },
          {path: 'editarGastoProveedor/:id',   component: AddVendorInvoiceSpendComponent },


          {path: 'facturas',   component: InvoiceComponent, canActivate: [guard], data: {expectedRol: ['admin', 'user']}},
          {path: 'crearFactura',   component: AddInvoiceComponent },
          {path: 'editarFactura/:id',   component: AddInvoiceComponent, canActivate: [guard], data: {expectedRol: ['admin', 'user']}  },
          {path: 'cobros/:id',   component: BillComponent, canActivate: [guard], data: {expectedRol: ['admin', 'user']}  },
          {path: 'crearCobro/:idCliente',   component: AddBillComponent, canActivate: [guard], data: {expectedRol: ['admin', 'user']}  },
          {path: 'editarCobro/:id',   component: AddBillComponent, canActivate: [guard], data: {expectedRol: ['admin', 'user']}  },


          // {path: 'categorias',  component: ProductComponent },
          //   {path: 'graficas',  component: Graficas1Component },
        //   {path: 'account-settings',  component: AccountSettingsComponent },

          {path: '', redirectTo: '/dashboard', pathMatch: 'full'},

        ]
    },
    ];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes)
