import { TestBed, inject } from '@angular/core/testing';

import { CustomExciseValidationService } from './custom-excise-validation.service';

describe('CustomExciseValidationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomExciseValidationService]
    });
  });

  it('should be created', inject([CustomExciseValidationService], (service: CustomExciseValidationService) => {
    expect(service).toBeTruthy();
  }));
});
