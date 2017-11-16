import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {
  title = 'ASAAT';
  user: any;

  notifications = [
    { title: 'Test1', value: 'Value1', color: 'red', time: '07:22:00' },
    { title: 'Test2', value: 'Value2', color: 'blue', time: '07:22:00' },
    { title: 'Test3', value: 'Value3', color: 'orange', time: '07:22:00' }
  ];

  isChecked = false;
  fixed = true;

  constructor(
    public router: Router,
    public _authService: AuthenticationService
  ) { }

  ngOnInit() {
    this.user = this._authService.getUser();
    // console.log(this.user);
  }

  public logout() {
    this._authService.logOut();
    this.user = null;
    this.router.navigate(['/login']);
  }

  public checkNotifications(): void {
    this.isChecked = true;
  }

  public isCheckNotify(): boolean {
    return this.isChecked;
  }

  public toggle(): boolean {
    return this.fixed = !this.fixed;
  }

  ngOnDestroy() {
    // console.log(this.user);
  }

}
