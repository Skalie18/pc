import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindingsLettersComponent } from './findings-letters.component';

describe('FindingsLettersComponent', () => {
  let component: FindingsLettersComponent;
  let fixture: ComponentFixture<FindingsLettersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindingsLettersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindingsLettersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
