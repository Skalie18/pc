import { TestBed, inject } from '@angular/core/testing';

import { QuilityAssurerService } from './quility-assurer.service';

describe('QuilityAssurerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuilityAssurerService]
    });
  });

  it('should be created', inject([QuilityAssurerService], (service: QuilityAssurerService) => {
    expect(service).toBeTruthy();
  }));
});
