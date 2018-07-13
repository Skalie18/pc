/* tslint:disable:no-unused-variable */
import { TestBed, async, inject } from '@angular/core/testing';
import { ImpersonationService } from './impersonation-service';

describe('ImpersonationService', () => {
  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [ImpersonationService]
    });
  });

  it('should ...', inject([ImpersonationService], (service: ImpersonationService) => {
    expect(service).toBeTruthy();
  }));
});
