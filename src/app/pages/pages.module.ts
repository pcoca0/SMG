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
import { ClientComponent } from './client/client.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ReportBudgetComponent } from './report-budget/report-budget.component';
import { VendorComponent } from './vendor/vendor.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { AddInvoiceComponent } from './add-invoice/add-invoice.component';
import { NgxBootstrapModule } from '../shared/ngx-bootstrap/ngx-bootstrap.module';
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


@NgModule({
  declarations: [PagesComponent, DashboardComponent, CategoryComponent, ProductComponent, BudgetComponent, AddBudgetComponent, ClientComponent, ReportBudgetComponent, VendorComponent, InvoiceComponent, AddInvoiceComponent, AddProductComponent, VendorInvoiceComponent, AddVendorInvoiceComponent, AddVendorInvoiceSpendComponent, CheckComponent, PayOrdersComponent, AddPayOrdersComponent, AddBillComponent, BillComponent, TrackComponent, TrackingViewComponent, ClientMovementComponent, VendorMovementComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    PAGES_ROUTES,
    SweetAlert2Module
  ]
})
export class PagesModule { }
