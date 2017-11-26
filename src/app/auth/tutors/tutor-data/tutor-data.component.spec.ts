import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorDataComponent } from './tutor-data.component';

describe('TutorDataComponent', () => {
  let component: TutorDataComponent;
  let fixture: ComponentFixture<TutorDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
