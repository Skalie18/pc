import { TestBed, inject } from '@angular/core/testing';

import { ReviewerServiceService } from './reviewer-service.service';

describe('ReviewerServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReviewerServiceService]
    });
  });

  it('should be created', inject([ReviewerServiceService], (service: ReviewerServiceService) => {
    expect(service).toBeTruthy();
  }));
});
