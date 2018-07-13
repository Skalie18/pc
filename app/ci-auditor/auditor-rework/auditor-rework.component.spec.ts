import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AuditorReworkComponent } from './auditor-rework.component';


describe('AuditorReworkComponent', () => {
  let component: AuditorReworkComponent;
  let fixture: ComponentFixture<AuditorReworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditorReworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditorReworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});  
