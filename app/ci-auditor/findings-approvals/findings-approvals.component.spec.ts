import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindingsApprovalsComponent } from './findings-approvals.component';

describe('FindingsApprovalsComponent', () => {
  let component: FindingsApprovalsComponent;
  let fixture: ComponentFixture<FindingsApprovalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindingsApprovalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindingsApprovalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
