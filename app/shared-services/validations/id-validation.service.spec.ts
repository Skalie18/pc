import { TestBed, inject } from '@angular/core/testing';

import { IdValidationService } from './id-validation.service';

describe('IdValidationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IdValidationService]
    });
  });

  it('should be created', inject([IdValidationService], (service: IdValidationService) => {
    expect(service).toBeTruthy();
  }));
});
