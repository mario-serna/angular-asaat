import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MzToastService } from 'ng2-materialize';
import { TutorsService } from '../services/tutors.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-tutor-detail',
  templateUrl: './tutor-detail.component.html',
  styleUrls: ['./tutor-detail.component.css']
})
export class TutorDetailComponent implements OnInit {
  user: any = <any>{};
  tutor: any = <any>{};
  isLoading = true;
  response: any = null;
  tutorData = { tutor: {}, user: {} };
  sectionsUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _tutorsService: TutorsService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id: number = params['id'];
      this._tutorsService.getTutor(id).subscribe(
        (data) => {
          this.tutor = data.tutor;
          this.user = data.user;
          this.isLoading = false;
          this.tutorData.tutor = this.tutor;
          this.tutorData.user = this.user;
          this.sectionsUrl = `${this.router.url}/sections`;
          // console.log(this.tutorData);
        }, err => {
          this.response = JSON.parse(err._body);
          this.isLoading = false;
          this.tutor = null;
          console.log(this.response);
        });
    });
  }

}
