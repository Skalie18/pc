import { TestBed, inject } from '@angular/core/testing';

import { AuditDataproviderService } from './audit-dataprovider-service.service';

describe('AuditDataproviderServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuditDataproviderService]
    });
  });

  it('should be created', inject([AuditDataproviderService], (service: AuditDataproviderService) => {
    expect(service).toBeTruthy();
  }));
});
