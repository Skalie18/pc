import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CiManagerComponent } from './ci-manager.component';

describe('CiManagerComponent', () => {
  let component: CiManagerComponent;
  let fixture: ComponentFixture<CiManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CiManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CiManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
