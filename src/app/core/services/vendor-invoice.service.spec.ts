import { TestBed } from '@angular/core/testing';

import { VendorInvoiceService } from './vendor-invoice.service';

describe('VendorInvoiceService', () => {
  let service: VendorInvoiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VendorInvoiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
