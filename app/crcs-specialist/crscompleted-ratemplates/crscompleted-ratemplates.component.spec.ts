import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrscompletedRatemplatesComponent } from './crscompleted-ratemplates.component';

describe('CrscompletedRatemplatesComponent', () => {
  let component: CrscompletedRatemplatesComponent;
  let fixture: ComponentFixture<CrscompletedRatemplatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrscompletedRatemplatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrscompletedRatemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
