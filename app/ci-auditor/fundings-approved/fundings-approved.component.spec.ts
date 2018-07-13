import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FundingsApprovedComponent } from './fundings-approved.component';

describe('FundingsApprovedComponent', () => {
  let component: FundingsApprovedComponent;
  let fixture: ComponentFixture<FundingsApprovedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundingsApprovedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundingsApprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
