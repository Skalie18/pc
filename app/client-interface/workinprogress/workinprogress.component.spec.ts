/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WorkinprogressComponent } from './workinprogress.component';

describe('WorkinprogressComponent', () => {
  let component: WorkinprogressComponent;
  let fixture: ComponentFixture<WorkinprogressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkinprogressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkinprogressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
