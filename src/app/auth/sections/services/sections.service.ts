import { Injectable } from '@angular/core';
import { AppConfig } from '../../../config/app.config';
import { HttpService } from '../../common-services/http.service';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SessionStorageService } from 'ng2-webstorage';
import { Tutor } from '../../tutors/models/tutor';
import { User } from '../../users/models/user';

@Injectable()
export class SectionsService extends HttpService {
  constructor(
    private http: Http,
    private _locker: SessionStorageService
  ) {
    super(http);
  }

  getSections(): Observable<any[]> {
    const url = `${AppConfig.API_SERVER_URL}/sections`;
    return this.get(url, this.getToken());
  }

  getSection(id: number | string): Observable<any> {
    const url = `${AppConfig.API_SERVER_URL}/sections/${id}`;
    return this.get(url, this.getToken());
  }

  createSection(section: any): Observable<any> {
    const url = `${AppConfig.API_SERVER_URL}/sections`;
    return this.post(url, { section: section }, this.getToken());
  }

  updateSection(section: any): Observable<any> {
    const url = `${AppConfig.API_SERVER_URL}/sections/${section.id}`;
    return this.put(url, { section: section }, this.getToken());
  }

  deleteSection(id: number | string): Observable<any> {
    const url = `${AppConfig.API_SERVER_URL}/sections/${id}`;
    return this.delete(url, this.getToken());
  }

  searchSection(term: string): Observable<any[]> {
    const url = `${AppConfig.API_SERVER_URL}/sections/search/${term}/limit/5`;
    return this.get(url, this.getToken());
  }

  searchSectionBy(key: string, value: number | string): Observable<any> {
    const url = `${AppConfig.API_SERVER_URL}/sections/searchBy/${key}/${value}`;
    return this.get(url, this.getToken());
  }

  getToken(): string {
    const user = this._locker.retrieve('user');
    return user ? user.api_token : '';
  }

}
