import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorInvoiceViewComponent } from './vendor-invoice-view.component';

describe('VendorInvoiceViewComponent', () => {
  let component: VendorInvoiceViewComponent;
  let fixture: ComponentFixture<VendorInvoiceViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorInvoiceViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorInvoiceViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
