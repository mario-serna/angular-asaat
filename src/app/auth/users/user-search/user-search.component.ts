import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

import { UsersService } from '../services/users.service';
import { User } from '../models/user';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit {
  @Output() onSearch = new EventEmitter<boolean>();
  showResult = false;

  users: Observable<User[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private _userService: UsersService,
    private router: Router
  ) { }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit() {
    this.users = this.searchTerms
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => term
        ? this._userService.searchUser(term)
        : Observable.of<User[]>([])).catch(error => {
          console.log(error);
          return Observable.of<User[]>([]);
        });
  }

  gotoDetail(user: User): void {
    this.showResult = false;
    this.onSearch.emit(false);
    this.router.navigate(['users/detail/', user.id]);
  }

}
