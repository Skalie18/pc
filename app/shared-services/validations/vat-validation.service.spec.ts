import { TestBed, inject } from '@angular/core/testing';

import { VatValidationService } from './vat-validation.service';

describe('VatValidationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VatValidationService]
    });
  });

  it('should be created', inject([VatValidationService], (service: VatValidationService) => {
    expect(service).toBeTruthy();
  }));
});
