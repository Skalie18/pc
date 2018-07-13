import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaAuditscopeComponent } from './ra-auditscope.component';

describe('RaAuditscopeComponent', () => {
  let component: RaAuditscopeComponent;
  let fixture: ComponentFixture<RaAuditscopeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaAuditscopeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaAuditscopeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
