import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewerWorkinComponent } from './reviewer-workin.component';

describe('ReviewerWorkinComponent', () => {
  let component: ReviewerWorkinComponent;
  let fixture: ComponentFixture<ReviewerWorkinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewerWorkinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewerWorkinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
