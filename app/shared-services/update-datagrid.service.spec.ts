import { TestBed, inject } from '@angular/core/testing';

import { UpdateDatagridService } from './update-datagrid.service';

describe('UpdateDatagridService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UpdateDatagridService]
    });
  });

  it('should be created', inject([UpdateDatagridService], (service: UpdateDatagridService) => {
    expect(service).toBeTruthy();
  }));
});
