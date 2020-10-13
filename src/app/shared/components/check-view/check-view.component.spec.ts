import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckViewComponent } from './check-view.component';

describe('CheckViewComponent', () => {
  let component: CheckViewComponent;
  let fixture: ComponentFixture<CheckViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
