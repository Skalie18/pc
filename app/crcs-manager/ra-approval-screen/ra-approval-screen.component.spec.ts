import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaApprovalScreenComponent } from './ra-approval-screen.component';

describe('RaApprovalScreenComponent', () => {
  let component: RaApprovalScreenComponent;
  let fixture: ComponentFixture<RaApprovalScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaApprovalScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaApprovalScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
