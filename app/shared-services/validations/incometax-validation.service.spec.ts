import { TestBed, inject } from '@angular/core/testing';

import { IncometaxValidationService } from './incometax-validation.service';

describe('IncometaxValidationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IncometaxValidationService]
    });
  });

  it('should be created', inject([IncometaxValidationService], (service: IncometaxValidationService) => {
    expect(service).toBeTruthy();
  }));
});
