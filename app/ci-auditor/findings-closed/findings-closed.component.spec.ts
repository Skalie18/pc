import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindingsClosedComponent } from './findings-closed.component';

describe('FindingsClosedComponent', () => {
  let component: FindingsClosedComponent;
  let fixture: ComponentFixture<FindingsClosedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindingsClosedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindingsClosedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
