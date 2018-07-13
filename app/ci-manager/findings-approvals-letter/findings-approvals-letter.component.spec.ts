import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindingsApprovalsLetterComponent } from './findings-approvals-letter.component';

describe('FindingsApprovalsLetterComponent', () => {
  let component: FindingsApprovalsLetterComponent;
  let fixture: ComponentFixture<FindingsApprovalsLetterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindingsApprovalsLetterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindingsApprovalsLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
