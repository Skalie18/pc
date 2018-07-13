/* tslint:disable:no-unused-variable */
import { TestBed, async, inject } from '@angular/core/testing';
import { DashboardDataService } from './dashboard-service.service';

describe('DashboardDataService', () => {
  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [DashboardDataService]
    });
  });

  it('should ...', inject([DashboardDataService], (service: DashboardDataService) => {
    expect(service).toBeTruthy();
  }));
});
