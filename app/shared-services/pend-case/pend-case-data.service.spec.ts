import { TestBed, inject } from '@angular/core/testing';

import { PendCaseDataService } from './pend-case-data.service';

describe('PendCaseDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PendCaseDataService]
    });
  });

  it('should be created', inject([PendCaseDataService], (service: PendCaseDataService) => {
    expect(service).toBeTruthy();
  }));
});
