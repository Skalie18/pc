import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaApprovalComponent } from './ra-approval.component';

describe('RaApprovalComponent', () => {
  let component: RaApprovalComponent;
  let fixture: ComponentFixture<RaApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
