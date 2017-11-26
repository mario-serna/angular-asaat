import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { StudentDataService } from './student-data.service';
import { MzToastService } from 'ng2-materialize';
import * as moment from 'moment';
import 'moment/locale/es';

@Component({
  selector: 'app-student-data',
  templateUrl: './student-data.component.html',
  styleUrls: ['./student-data.component.css'],
  providers: [StudentDataService]
})
export class StudentDataComponent implements OnInit {
  @Input() student: any;
  user: any = {};
  response: any;
  loading = true;
  exist = false;
  saved = false;

  options = [
    { tooltip: 'Crear', icon: 'upload' },
    { tooltip: 'Actualizar', icon: 'update' },
    { tooltip: 'Guardado', icon: 'check' },
  ];

  option = this.options[0];

  constructor(
    private router: Router,
    private _studentsService: StudentDataService,
    private toast: MzToastService
  ) { }

  ngOnInit() {
    const url = this.router.url.split('/');
    // If url.length is equal to 5 then is fast access from header
    this.student.section_id = url.length === 5 ? +url[2] : +url[4];

    this._studentsService.searchStudentBy('reg_number', this.student.reg_number).subscribe(
      (data) => {
        this.exist = data.exist;
        this.option = this.exist ? this.options[1] : this.options[0];
        if (this.exist) {
          this.student.id = data.students[0].id;
          this.student.created_at = data.students[0].created_at;
          this.student.updated_at = data.students[0].updated_at;
          // Adjusting time to time-zone
          const gmtCreated = moment.utc(this.student.created_at);
          const gmtUpdated = moment.utc(this.student.updated_at);
          const localCreated = gmtCreated.local().format('llll');
          const localUpdated = gmtUpdated.local().format('llll');
          this.option.tooltip = `<b class=\'blue-text\'>Creado:</b> ${localCreated}<br>
          <b class=\'red-text\'>Modificado:</b> ${localUpdated}`;
        }
        // console.log(this.exist);
        // console.log(this.tutor);
      }, err => {
        this.response = JSON.parse(err._body);
        // console.log(this.response);
        // console.log(this.response);
      }, () => {
        this.loading = false;
      }
    );
  }

  save() {
    this.generateUser();
    this.loading = true;
    // console.log({ tutor: this.tutor, user: this.user });
    if (!this.exist) {
      this._studentsService.createStudent(this.student, this.user).subscribe(
        (data) => {
          this.option = this.options[2];
          this.exist = this.saved = true;
          this.toast.show(`El alumno ${data.user.fullname} ha sido creado!`, 4000, 'green');
          // console.log(data);
        }, err => {
          console.log(err);
        }
      );
    } else {
      this._studentsService.updateStudent(this.student, this.user).subscribe(
        (data) => {
          this.option = this.options[2];
          this.saved = true;
          this.toast.show(`El alumno ${data.user.fullname} ha sido actualizado!`, 4000, 'green');
        }, err => {
          console.log(err);
        }
      );
    }
    this.loading = false;
  }

  splitFullname() {
    const fullname: string = this.student.fullname;
    const arrName = fullname.split(' ');

    this.student.lastname = arrName[0];
    this.student.m_lastname = arrName[1];
    this.student.name = arrName[3] ? arrName[2] + ' ' + arrName[3] : arrName[2];
    // console.log(this.tutor.name);
  }

  generateUser() {
    this.splitFullname();
    this.user.fullname = this.student.m_lastname ?
      `${this.student.name} ${this.student.lastname} ${this.student.m_lastname}` :
      `${this.student.name} ${this.student.lastname}`;
    this.user.username = this.student.reg_number;
    this.user.password = this.student.reg_number;
    this.user.level = 2;
    this.user.access = 1;
    this.user.email = this.student.email;
    this.student.alt_email = '';

    console.log({ student: this.student, user: this.user });
  }
}
