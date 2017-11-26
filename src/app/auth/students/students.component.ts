import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  showSearch = false;
  validUrl = false;
  constructor(
    public router: Router
  ) { }

  ngOnInit() {
    const url = this.router.url;
    if (url.indexOf('/tutors') !== -1 || url.indexOf('/sections') !== -1) {
      this.validUrl = true;
    }
  }

}
