import { TestBed, inject } from '@angular/core/testing';

import { AuditorTemplateService } from './auditor-template.service';

describe('AuditorTemplateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuditorTemplateService]
    });
  });

  it('should be created', inject([AuditorTemplateService], (service: AuditorTemplateService) => {
    expect(service).toBeTruthy();
  }));
});
