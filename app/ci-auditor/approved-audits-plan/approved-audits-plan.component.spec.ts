import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedAuditsPlanComponent } from './approved-audits-plan.component';

describe('ApprovedAuditsPlanComponent', () => {
  let component: ApprovedAuditsPlanComponent;
  let fixture: ComponentFixture<ApprovedAuditsPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovedAuditsPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedAuditsPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
