import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MzToastService } from 'ng2-materialize';
import { TutorsService } from '../services/tutors.service';

@Component({
  selector: 'app-tutor-form',
  templateUrl: './tutor-form.component.html',
  styleUrls: ['./tutor-form.component.css']
})
export class TutorFormComponent implements OnInit {
  @Input() tutorData?: any;
  user: any = <any>{};
  tutor: any = <any>{};
  response: any = null;

  constructor(
    private router: Router,
    private _tutorsService: TutorsService,
    private toast: MzToastService
  ) { }

  ngOnInit() {
    if (this.tutorData) {
      this.tutor = this.tutorData.tutor;
      this.user = this.tutorData.user;
    }
  }

  save(event: Event): void {
    event.preventDefault();
    this.generateUser();

    if (!this.tutorData) {
      this._tutorsService.createTutor(this.tutor, this.user).subscribe(
        (data) => {
          console.log(data);
          this.tutor = data.tutor;
          this.toast.show(`El tutor ${data.user.fullname} ha sido creado!`, 4000, 'green');
          this.router.navigate(['tutors']);
        }, err => {
          this.toast.show(`Ha ocurrido un problema al crear el tutor ${this.user.fullname}`, 4000, 'red');
          this.response = JSON.parse(err._body);
          console.log(this.response);
        });
    } else {
      this._tutorsService.updateTutor(this.tutor, this.user).subscribe(
        (data) => {
          this.tutor = data.tutor;
          this.user = data.user;
          this.toast.show(`Se han guardado los cambios!`, 4000, 'green');
        }, err => {
          this.toast.show(`Ha ocurrido un error al realizar los cambios!`, 4000, 'red');
          this.response = JSON.parse(err._body);
          console.log(this.response);
        });
    }
  }

  generateUser(): void {
    this.tutor.m_lastname = !this.tutor.m_lastname ? '' : this.tutor.m_lastname;
    this.tutor.alt_email = !this.tutor.alt_email ? '' : this.tutor.alt_email;

    this.user.fullname = this.tutor.m_lastname ?
      `${this.tutor.name} ${this.tutor.lastname} ${this.tutor.m_lastname}` :
      `${this.tutor.name} ${this.tutor.lastname}`;
    this.user.level = 1;
    this.user.username = this.tutor.worker_number;
    if (!this.tutorData) {
      this.user.password = this.tutor.worker_number;
    }
  }
}
