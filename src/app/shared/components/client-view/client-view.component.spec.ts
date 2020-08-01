import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientViewComponent } from './client-view.component';

describe('ClienViewComponent', () => {
  let component: ClienViewComponent;
  let fixture: ComponentFixture<ClienViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClienViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
