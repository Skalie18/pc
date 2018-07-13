import { TestBed, inject } from '@angular/core/testing';

import { PendCaseService } from './pend-case.service';

describe('PendCaseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PendCaseService]
    });
  });

  it('should be created', inject([PendCaseService], (service: PendCaseService) => {
    expect(service).toBeTruthy();
  }));
});
