import { TestBed, inject } from '@angular/core/testing';

import { ViewchangedatastoreService } from './viewchangedatastore.service';

describe('ViewchangedatastoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ViewchangedatastoreService]
    });
  });

  it('should be created', inject([ViewchangedatastoreService], (service: ViewchangedatastoreService) => {
    expect(service).toBeTruthy();
  }));
});
