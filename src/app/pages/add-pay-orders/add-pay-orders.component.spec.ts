import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPayOrdersComponent } from './add-pay-orders.component';

describe('AddPayOrdersComponent', () => {
  let component: AddPayOrdersComponent;
  let fixture: ComponentFixture<AddPayOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPayOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPayOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
