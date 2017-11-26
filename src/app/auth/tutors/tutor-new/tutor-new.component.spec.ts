import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorNewComponent } from './tutor-new.component';

describe('TutorNewComponent', () => {
  let component: TutorNewComponent;
  let fixture: ComponentFixture<TutorNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
