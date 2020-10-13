import { Component, Input, OnInit } from '@angular/core';
import { IVendorInvoiceItemResponse } from 'src/app/core/interfaces/responses/vendor-invoice.response';

@Component({
  selector: 'app-vendor-invoice-view',
  templateUrl: './vendor-invoice-view.component.html',
  styleUrls: ['./vendor-invoice-view.component.scss']
})
export class VendorInvoiceViewComponent implements OnInit {
  
  @Input() vendorInvoice: IVendorInvoiceItemResponse;

  constructor() { }

  ngOnInit(): void {
  }

}
