import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaApprovalRejectionComponent } from './ra-approval-rejection.component';

describe('RaApprovalRejectionComponent', () => {
  let component: RaApprovalRejectionComponent;
  let fixture: ComponentFixture<RaApprovalRejectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaApprovalRejectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaApprovalRejectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
