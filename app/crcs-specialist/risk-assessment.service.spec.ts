import { TestBed, inject } from '@angular/core/testing';

import { RiskAssessmentService } from './risk-assessment.service';

describe('RiskAssessmentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RiskAssessmentService]
    });
  });

  it('should be created', inject([RiskAssessmentService], (service: RiskAssessmentService) => {
    expect(service).toBeTruthy();
  }));
});
