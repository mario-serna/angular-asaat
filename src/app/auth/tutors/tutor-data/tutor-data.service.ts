import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SessionStorageService } from 'ng2-webstorage';
import { TutorsService } from '../services/tutors.service';

@Injectable()
export class TutorDataService extends TutorsService {

  constructor(
    http: Http,
    _locker: SessionStorageService
  ) {
    super(http, _locker);
  }

}
