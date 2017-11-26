import { Injectable } from '@angular/core';
import { AppConfig } from '../../../config/app.config';
import { HttpService } from '../../common-services/http.service';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SessionStorageService } from 'ng2-webstorage';
import { User } from '../../users/models/user';

@Injectable()
export class StudentsService extends HttpService {

  constructor(
    private http: Http,
    private _locker: SessionStorageService
  ) {
    super(http);
  }

  getStudents(): Observable<any[]> {
    const url = `${AppConfig.API_SERVER_URL}/students`;
    return this.get(url, this.getToken());
  }

  getStudent(id: number | string): Observable<any> {
    const url = `${AppConfig.API_SERVER_URL}/students/${id}`;
    return this.get(url, this.getToken());
  }

  createStudent(student: any, user: User): Observable<any> {
    const url = `${AppConfig.API_SERVER_URL}/students`;
    return this.post(url, { student: student, user: user }, this.getToken());
  }

  updateStudent(student: any, user: User): Observable<any> {
    const url = `${AppConfig.API_SERVER_URL}/students/${student.id}`;
    return this.put(url, { student: student, user: user }, this.getToken());
  }

  deleteStudent(id: number | string): Observable<any> {
    const url = `${AppConfig.API_SERVER_URL}/students/${id}`;
    return this.delete(url, this.getToken());
  }

  searchStudent(term: string): Observable<any[]> {
    const url = `${AppConfig.API_SERVER_URL}/students/search/${term}/limit/5`;
    return this.get(url, this.getToken());
  }

  searchStudentBy(key: string, value: number | string): Observable<any> {
    const url = `${AppConfig.API_SERVER_URL}/students/searchBy/${key}/${value}`;
    return this.get(url, this.getToken());
  }

  getToken(): string {
    const user = this._locker.retrieve('user');
    return user ? user.api_token : '';
  }

}
