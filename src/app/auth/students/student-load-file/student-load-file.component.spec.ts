import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentLoadFileComponent } from './student-load-file.component';

describe('StudentLoadFileComponent', () => {
  let component: StudentLoadFileComponent;
  let fixture: ComponentFixture<StudentLoadFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentLoadFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentLoadFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
