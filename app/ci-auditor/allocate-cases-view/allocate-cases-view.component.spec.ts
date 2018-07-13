import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocateCasesViewComponent } from './allocate-cases-view.component';

describe('AllocateCasesViewComponent', () => {
  let component: AllocateCasesViewComponent;
  let fixture: ComponentFixture<AllocateCasesViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllocateCasesViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllocateCasesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
