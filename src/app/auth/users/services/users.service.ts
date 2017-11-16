import { Injectable } from '@angular/core';
import { AppConfig } from '../../../config/app.config';
import { HttpService } from '../../common-services/http.service';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SessionStorageService } from 'ng2-webstorage';
import { User } from '../models/user';


@Injectable()
export class UsersService extends HttpService {

  constructor(
    private http: Http,
    public _locker: SessionStorageService
  ) {
    super(http);

  }

  getUsers(): Observable<User[]> {
    const url = `${AppConfig.API_SERVER_URL}/users`;
    return this.get(url, this.getToken());
  }

  getUser(id: number | string): Observable<User> {
    const url = `${AppConfig.API_SERVER_URL}/users/${id}`;
    return this.get(url, this.getToken());
  }

  createUser(user: User): Observable<User> {
    const url = `${AppConfig.API_SERVER_URL}/users`;
    return this.post(url, user, this.getToken());
  }

  updateUser(user: User): Observable<User> {
    const url = `${AppConfig.API_SERVER_URL}/users/${user.id}`;
    return this.put(url, user, this.getToken());
  }

  deleteUser(id: number | string): Observable<User> {
    const url = `${AppConfig.API_SERVER_URL}/users/${id}`;
    return this.delete(url, this.getToken());
  }

  searchUser(term: string): Observable<User[]> {
    const url = `${AppConfig.API_SERVER_URL}/users/search/${term}/limit/5`;
    return this.get(url, this.getToken());
  }

  getToken(): string {
    const user = this._locker.retrieve('user');
    return user ? user.api_token : '';
  }

}
