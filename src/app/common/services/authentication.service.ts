import { Injectable } from '@angular/core';
import { HttpService } from '../../auth/common-services/http.service';
import { LocalStorageService, SessionStorageService } from 'ng2-webstorage';
import 'rxjs/add/operator/map';
import { AppConfig } from '../../config/app.config';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthenticationService {
  hasSession = false;
  hasAccess = false;
  user;
  authBaseUrl: string = AppConfig.AUTH_SERVER_URL;
  public _dataSource = new BehaviorSubject<boolean>(false);
  dataSource$ = this._dataSource.asObservable();

  constructor(
    public _http: HttpService,
    public _localService: LocalStorageService,
    public _sessionService: SessionStorageService
  ) { }

  public isLoggedIn() {
    const user = this._sessionService.retrieve('user');
    if (!!user) {
      this.user = user;
      this.hasAccess = user.access;
      this.hasSession = true;
    }
    return this.hasSession;
  }

  public logIn(username: string, password: string, remember_token?: boolean) {
    const url = `${this.authBaseUrl}/users/login`;

    return this._http.post(url, {
      'username': username,
      'password': password
    });
  }

  public logOut() {
    this.user = null;
    this.hasSession = false;
    this._localService.clear('user');
    this._sessionService.clear('user');
    this._dataSource.next(false);
  }

  public wasLoginSuccessful(flag: boolean) {
    this._dataSource.next(flag);
  }

  public getUser() {
    return this.isLoggedIn() ? this.user : false;
  }

}
