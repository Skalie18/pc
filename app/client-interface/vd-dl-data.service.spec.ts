/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VdDlDataService } from './vd-dl-data.service';

describe('VdDlDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VdDlDataService]
    });
  });

  it('should ...', inject([VdDlDataService], (service: VdDlDataService) => {
    expect(service).toBeTruthy();
  }));
});
