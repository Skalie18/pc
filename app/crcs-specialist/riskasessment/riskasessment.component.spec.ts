import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskasessmentComponent } from './riskasessment.component';

describe('RiskasessmentComponent', () => {
  let component: RiskasessmentComponent;
  let fixture: ComponentFixture<RiskasessmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiskasessmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskasessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
