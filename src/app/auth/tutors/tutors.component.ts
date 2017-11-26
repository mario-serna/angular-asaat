import { Component } from '@angular/core';

@Component({
  selector: 'app-tutors',
  templateUrl: './tutors.component.html',
  styleUrls: ['./tutors.component.css']
})
export class TutorsComponent {
  showSearch = false;

  constructor() { }

  onSearch(val: boolean) {
    this.showSearch = val;
  }

}
