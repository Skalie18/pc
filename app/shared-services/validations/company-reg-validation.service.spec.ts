import { TestBed, inject } from '@angular/core/testing';

import { CompanyRegValidationService } from './company-reg-validation.service';

describe('CompanyRegValidationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CompanyRegValidationService]
    });
  });

  it('should be created', inject([CompanyRegValidationService], (service: CompanyRegValidationService) => {
    expect(service).toBeTruthy();
  }));
});
