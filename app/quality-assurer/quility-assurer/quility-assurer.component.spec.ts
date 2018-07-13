import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuilityAssurerComponent } from './quility-assurer.component';

describe('QuilityAssurerComponent', () => {
  let component: QuilityAssurerComponent;
  let fixture: ComponentFixture<QuilityAssurerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuilityAssurerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuilityAssurerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
