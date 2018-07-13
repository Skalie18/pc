import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserWorkingprogressComponent } from './user-workingprogress.component';

describe('UserWorkingprogressComponent', () => {
  let component: UserWorkingprogressComponent;
  let fixture: ComponentFixture<UserWorkingprogressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserWorkingprogressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserWorkingprogressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
