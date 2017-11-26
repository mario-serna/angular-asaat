import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.css']
})
export class SectionsComponent implements OnInit {
  validUrl = false;

  constructor(
    public router: Router
  ) { }

  ngOnInit() {
    const url = this.router.url;
    if (url.indexOf('/tutors') !== -1) {
      this.validUrl = true;
    }
  }

}
