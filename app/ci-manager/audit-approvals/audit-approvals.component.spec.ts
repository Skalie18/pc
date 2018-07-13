import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditApprovalsComponent } from './audit-approvals.component';

describe('AuditApprovalsComponent', () => {
  let component: AuditApprovalsComponent;
  let fixture: ComponentFixture<AuditApprovalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditApprovalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditApprovalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
