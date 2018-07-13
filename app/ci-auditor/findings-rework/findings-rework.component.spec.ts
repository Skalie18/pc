import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindingsReworkComponent } from './findings-rework.component';

describe('FindingsReworkComponent', () => {
  let component: FindingsReworkComponent;
  let fixture: ComponentFixture<FindingsReworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindingsReworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindingsReworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
