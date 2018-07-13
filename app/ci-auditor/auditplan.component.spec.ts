/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AuditplanComponent } from './auditplan.component';

describe('AuditplanComponent', () => {
  let component: AuditplanComponent;
  let fixture: ComponentFixture<AuditplanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditplanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
