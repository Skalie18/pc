import { TestBed, inject } from '@angular/core/testing';

import { CiManagerService } from './ci-manager.service';

describe('CiManagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CiManagerService]
    });
  });

  it('should be created', inject([CiManagerService], (service: CiManagerService) => {
    expect(service).toBeTruthy();
  }));
});
