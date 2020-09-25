import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVendorInvoiceSpendComponent } from './add-vendor-invoice-spend.component';

describe('AddVendorInvoiceSpendComponent', () => {
  let component: AddVendorInvoiceSpendComponent;
  let fixture: ComponentFixture<AddVendorInvoiceSpendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddVendorInvoiceSpendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVendorInvoiceSpendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
