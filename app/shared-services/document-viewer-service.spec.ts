import { TestBed, inject } from '@angular/core/testing';

import { DocumentViewerService } from './document-viewer-service';

describe('DocumentViewerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DocumentViewerService]
    });
  });

  it('should be created', inject([DocumentViewerService], (service: DocumentViewerService) => {
    expect(service).toBeTruthy();
  }));
});
