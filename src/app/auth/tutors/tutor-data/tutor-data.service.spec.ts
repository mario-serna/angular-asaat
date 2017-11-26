import { TestBed, inject } from '@angular/core/testing';

import { TutorDataService } from './tutor-data.service';

describe('TutorDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TutorDataService]
    });
  });

  it('should be created', inject([TutorDataService], (service: TutorDataService) => {
    expect(service).toBeTruthy();
  }));
});
