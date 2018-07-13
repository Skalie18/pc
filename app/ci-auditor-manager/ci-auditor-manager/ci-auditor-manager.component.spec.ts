import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CiAuditorManagerComponent } from './ci-auditor-manager.component';

describe('CiAuditorManagerComponent', () => {
  let component: CiAuditorManagerComponent;
  let fixture: ComponentFixture<CiAuditorManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CiAuditorManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CiAuditorManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
