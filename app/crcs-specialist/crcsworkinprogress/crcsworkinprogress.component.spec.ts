import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrcsworkinprogressComponent } from './crcsworkinprogress.component';

describe('CrcsworkinprogressComponent', () => {
  let component: CrcsworkinprogressComponent;
  let fixture: ComponentFixture<CrcsworkinprogressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrcsworkinprogressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrcsworkinprogressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
