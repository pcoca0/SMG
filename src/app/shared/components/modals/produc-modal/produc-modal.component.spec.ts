import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducModalComponent } from './produc-modal.component';

describe('ProducModalComponent', () => {
  let component: ProducModalComponent;
  let fixture: ComponentFixture<ProducModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProducModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProducModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
