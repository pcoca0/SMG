import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorMovementComponent } from './vendor-movement.component';

describe('VendorMovementComponent', () => {
  let component: VendorMovementComponent;
  let fixture: ComponentFixture<VendorMovementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorMovementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorMovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
