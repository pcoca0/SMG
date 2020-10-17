import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvioceViewComponent } from './invioce-view.component';

describe('InvioceViewComponent', () => {
  let component: InvioceViewComponent;
  let fixture: ComponentFixture<InvioceViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvioceViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvioceViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
