import { TestBed, inject } from '@angular/core/testing';

import { AuditPlanProviderService } from './audit-plan-provider.service';

describe('AuditPlanProviderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuditPlanProviderService]
    });
  });

  it('should be created', inject([AuditPlanProviderService], (service: AuditPlanProviderService) => {
    expect(service).toBeTruthy();
  }));
});
