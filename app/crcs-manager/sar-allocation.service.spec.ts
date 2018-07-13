import { TestBed, inject } from '@angular/core/testing';

import { SarAllocationService } from './sar-allocation.service';

describe('SarAllocationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SarAllocationService]
    });
  });

  it('should be created', inject([SarAllocationService], (service: SarAllocationService) => {
    expect(service).toBeTruthy();
  }));
});
