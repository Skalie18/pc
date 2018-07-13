import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditPlanWorkinprogressComponent } from './AuditPlanWorkinprogress.component';

describe('AuditPlanWorkinprogressComponent', () => {
  let component: AuditPlanWorkinprogressComponent;
  let fixture: ComponentFixture<AuditPlanWorkinprogressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditPlanWorkinprogressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditPlanWorkinprogressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});  
