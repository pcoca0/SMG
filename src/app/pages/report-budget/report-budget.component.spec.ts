import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportBudgetComponent } from './report-budget.component';

describe('ReportBudgetComponent', () => {
  let component: ReportBudgetComponent;
  let fixture: ComponentFixture<ReportBudgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportBudgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
