import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorInvoiceProductModalComponent } from './vendor-invoice-product-modal.component';

describe('VendorInvoiceProductModalComponent', () => {
  let component: VendorInvoiceProductModalComponent;
  let fixture: ComponentFixture<VendorInvoiceProductModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorInvoiceProductModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorInvoiceProductModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
