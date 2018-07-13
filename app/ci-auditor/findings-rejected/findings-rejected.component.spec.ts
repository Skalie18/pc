import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindingsRejectedComponent } from './findings-rejected.component';

describe('FindingsRejectedComponent', () => {
  let component: FindingsRejectedComponent;
  let fixture: ComponentFixture<FindingsRejectedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindingsRejectedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindingsRejectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
