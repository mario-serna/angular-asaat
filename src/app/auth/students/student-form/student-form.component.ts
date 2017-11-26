import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MzToastService } from 'ng2-materialize';
import { StudentsService } from '../services/students.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {
  @Input() studentData?: any;
  user: any = <any>{};
  student: any = <any>{};
  response: any = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _studentsService: StudentsService,
    private toast: MzToastService
  ) { }

  ngOnInit() {
    const url = this.router.url.split('/');
    // If url.length is equal to 5 then is fast access from header
    this.student.section_id = url.length === 5 ? +url[2] : +url[4];
    // console.log(url);
    if (this.studentData) {
      this.student = this.studentData.student;
      this.user = this.studentData.user;
    }
  }

  save(event: Event): void {
    event.preventDefault();
    this.generateUser();

    if (!this.studentData) {
      this._studentsService.createStudent(this.student, this.user).subscribe(
        (data) => {
          // console.log(data);
          this.student = data.student;
          this.toast.show(`El alumno ${data.user.fullname} ha sido creado!`, 4000, 'green');
          this.router.navigate(['../'], { relativeTo: this.route });
        }, err => {
          this.toast.show(`Ha ocurrido un problema al crear el alumno ${this.user.fullname}`, 4000, 'red');
          this.response = JSON.parse(err._body);
          console.log(this.response);
        });
    } else {
      this._studentsService.updateStudent(this.student, this.user).subscribe(
        (data) => {
          this.student = data.student;
          this.user = data.user;
          this.toast.show(`Se han guardado los cambios!`, 4000, 'green');
        }, err => {
          this.toast.show(`Ha ocurrido un error al realizar los cambios!`, 4000, 'red');
          this.response = err;
          console.log(this.response);
        });
    }
  }

  generateUser(): void {
    this.student.m_lastname = !this.student.m_lastname ? '' : this.student.m_lastname;
    this.student.alt_email = !this.student.alt_email ? '' : this.student.alt_email;

    this.user.fullname = this.student.m_lastname ?
      `${this.student.name} ${this.student.lastname} ${this.student.m_lastname}` :
      `${this.student.name} ${this.student.lastname}`;
    this.user.level = 2;
    this.user.username = this.student.reg_number;
    if (!this.studentData) {
      this.user.password = this.student.reg_number;
    }
  }
}
