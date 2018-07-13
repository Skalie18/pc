import { TestBed, inject } from '@angular/core/testing';

import { SystemUserProviderService } from './system-user-provider.service';

describe('SystemUserProviderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SystemUserProviderService]
    });
  });

  it('should be created', inject([SystemUserProviderService], (service: SystemUserProviderService) => {
    expect(service).toBeTruthy();
  }));
});
