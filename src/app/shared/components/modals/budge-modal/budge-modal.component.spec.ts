import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgeModalComponent } from './budge-modal.component';

describe('BudgeModalComponent', () => {
  let component: BudgeModalComponent;
  let fixture: ComponentFixture<BudgeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BudgeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
