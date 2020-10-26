import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientMovementComponent } from './client-movement.component';

describe('ClientMovementComponent', () => {
  let component: ClientMovementComponent;
  let fixture: ComponentFixture<ClientMovementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientMovementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientMovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
