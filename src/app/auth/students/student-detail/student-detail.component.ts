import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MzToastService } from 'ng2-materialize';
import { StudentsService } from '../services/students.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent implements OnInit {
  user: any = <any>{};
  student: any = <any>{};
  isLoading = true;
  response: any = null;
  studentData = { student: {}, user: {} };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _studentsService: StudentsService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id: number = params['id'];
      this._studentsService.getStudent(id).subscribe(
        (data) => {
          this.student = data.student;
          this.user = data.student.user;
          this.isLoading = false;
          this.studentData.student = this.student;
          this.studentData.user = this.user;
          // console.log(this.tutorData);
        }, err => {
          // this.response = JSON.parse(err._body);
          this.response = err;
          this.isLoading = false;
          this.student = null;
          console.log(this.response);
        });
    });
  }

}
