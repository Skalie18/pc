import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicalreviewComponent } from './technicalreview.component';

describe('TechnicalreviewComponent', () => {
  let component: TechnicalreviewComponent;
  let fixture: ComponentFixture<TechnicalreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechnicalreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnicalreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
