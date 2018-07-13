import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SarAllocationComponent } from './sar-allocation.component';

describe('SarAllocationComponent', () => {
  let component: SarAllocationComponent;
  let fixture: ComponentFixture<SarAllocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SarAllocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SarAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
