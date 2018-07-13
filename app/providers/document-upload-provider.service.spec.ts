import { TestBed, inject } from '@angular/core/testing';

import { DocumentUploadProviderService } from './document-upload-provider.service';

describe('DocumentUploadProviderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DocumentUploadProviderService]
    });
  });

  it('should be created', inject([DocumentUploadProviderService], (service: DocumentUploadProviderService) => {
    expect(service).toBeTruthy();
  }));
});
