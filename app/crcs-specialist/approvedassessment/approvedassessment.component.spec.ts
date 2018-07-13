import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedassessmentComponent } from './approvedassessment.component';

describe('ApprovedassessmentComponent', () => {
  let component: ApprovedassessmentComponent;
  let fixture: ComponentFixture<ApprovedassessmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovedassessmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedassessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
