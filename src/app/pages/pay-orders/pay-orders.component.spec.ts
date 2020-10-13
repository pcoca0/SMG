import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayOrdersComponent } from './pay-orders.component';

describe('PayOrdersComponent', () => {
  let component: PayOrdersComponent;
  let fixture: ComponentFixture<PayOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
