import { Component } from '@angular/core';

@Component({
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  showSearch = false;

  constructor() { }

  onSearch(val: boolean) {
    this.showSearch = val;
  }

}
