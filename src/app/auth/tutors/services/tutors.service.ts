import { Injectable } from '@angular/core';
import { AppConfig } from '../../../config/app.config';
import { HttpService } from '../../common-services/http.service';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SessionStorageService } from 'ng2-webstorage';
import { Tutor } from '../models/tutor';
import { User } from '../../users/models/user';

@Injectable()
export class TutorsService extends HttpService {

  constructor(
    private http: Http,
    private _locker: SessionStorageService
  ) {
    super(http);
  }

  getTutors(): Observable<Tutor[]> {
    const url = `${AppConfig.API_SERVER_URL}/tutors`;
    return this.get(url, this.getToken());
  }

  getTutor(id: number | string): Observable<any> {
    const url = `${AppConfig.API_SERVER_URL}/tutors/${id}`;
    return this.get(url, this.getToken());
  }

  createTutor(tutor: Tutor, user: User): Observable<any> {
    const url = `${AppConfig.API_SERVER_URL}/tutors`;
    return this.post(url, { tutor: tutor, user: user }, this.getToken());
  }

  createTutorsByFile(tutors: any): Observable<any> {
    const url = `${AppConfig.API_SERVER_URL}/tutors`;
    return this.post(url, tutors, this.getToken());
  }

  updateTutor(tutor: Tutor, user: User): Observable<any> {
    const url = `${AppConfig.API_SERVER_URL}/tutors/${tutor.id}`;
    return this.put(url, { tutor: tutor, user: user }, this.getToken());
  }

  deleteTutor(id: number | string): Observable<any> {
    const url = `${AppConfig.API_SERVER_URL}/tutors/${id}`;
    return this.delete(url, this.getToken());
  }

  searchTutor(term: string): Observable<Tutor[]> {
    const url = `${AppConfig.API_SERVER_URL}/tutors/search/${term}/limit/5`;
    return this.get(url, this.getToken());
  }

  searchTutorBy(key: string, value: number | string): Observable<any> {
    const url = `${AppConfig.API_SERVER_URL}/tutors/searchBy/${key}/${value}`;
    return this.get(url, this.getToken());
  }

  getToken(): string {
    const user = this._locker.retrieve('user');
    return user ? user.api_token : '';
  }

}
