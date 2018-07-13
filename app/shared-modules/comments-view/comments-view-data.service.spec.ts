import { TestBed, inject } from '@angular/core/testing';

import { CommentsViewDataService } from './comments-view-data.service';

describe('CommentsViewDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommentsViewDataService]
    });
  });

  it('should be created', inject([CommentsViewDataService], (service: CommentsViewDataService) => {
    expect(service).toBeTruthy();
  }));
});
