import { Component, OnInit } from '@angular/core';
import { AppConfig } from '../../config/app.config';
import { AuthenticationService } from '../../common/services/authentication.service';
import { Router } from '@angular/router';
import { LocalStorageService, SessionStorageService } from 'ng2-webstorage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  app_name: string = AppConfig.APP_NAME;
  user: any = <any>{};
  response: any = null;
  // Block the submit button on click until to get a response
  sending = false;

  constructor(
    public _authService: AuthenticationService,
    public _router: Router,
    public _localService: LocalStorageService,
    public _sessionService: SessionStorageService
  ) { }

  ngOnInit() {
    // const localUser = this._localService.retrieve('user');
    // if (localUser) {
    //   this.user = localUser;
    //   this.sendUser();
    // }
  }

  onSubmit(event: Event) {
    // Prevent page reload on submit
    event.preventDefault();
    this.sendUser();
  }

  sendUser() {
    this.sending = true;
    this._authService.logIn(this.user.username, this.user.password).subscribe(
      (data) => {
        this._authService.wasLoginSuccessful(true);
        this._authService.user = data;
        this._authService.hasSession = true;
        this._authService.hasAccess = true;
        this._sessionService.store('user', data);
        this._router.navigate(['/home']);
        this.sending = false;
      },
      err => {
        console.error(err);
        // this.response = JSON.parse(err._body);
        this._authService.wasLoginSuccessful(false);
        this._authService.hasSession = false;
        this._authService.hasAccess = false;
        this.sending = false;
      }
    );
  }

}
