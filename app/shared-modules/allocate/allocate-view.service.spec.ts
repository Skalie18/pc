import { TestBed, inject } from '@angular/core/testing';

import { AllocateViewService } from './allocate-view.service';

describe('AllocateViewService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AllocateViewService]
    });
  });

  it('should be created', inject([AllocateViewService], (service: AllocateViewService) => {
    expect(service).toBeTruthy();
  }));
});
