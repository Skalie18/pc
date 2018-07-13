import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AllocateViewComponent } from './allocate-view.component';



describe('AllocateViewComponent', () => {
  let component: AllocateViewComponent;
  let fixture: ComponentFixture<AllocateViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllocateViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllocateViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
