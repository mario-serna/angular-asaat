import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SessionStorageService } from 'ng2-webstorage';
import { StudentsService } from '../services/students.service';

@Injectable()
export class StudentDataService extends StudentsService {

  constructor(
    http: Http,
    _locker: SessionStorageService
  ) {
    super(http, _locker);
  }

}
