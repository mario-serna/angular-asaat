import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorLoadFileComponent } from './tutor-load-file.component';

describe('TutorLoadFileComponent', () => {
  let component: TutorLoadFileComponent;
  let fixture: ComponentFixture<TutorLoadFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorLoadFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorLoadFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
