import { Component, OnInit, Input } from '@angular/core';
import { TutorDataService } from './tutor-data.service';
import { MzToastService } from 'ng2-materialize';
import * as moment from 'moment';
import 'moment/locale/es';

@Component({
  selector: 'app-tutor-data',
  templateUrl: './tutor-data.component.html',
  styleUrls: ['./tutor-data.component.css'],
  providers: [TutorDataService]
})
export class TutorDataComponent implements OnInit {
  @Input() tutor: any;
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
    private _tutorService: TutorDataService,
    private toast: MzToastService
  ) { }

  ngOnInit() {
    this._tutorService.searchTutorBy('worker_number', this.tutor.worker_number).subscribe(
      (data) => {
        this.exist = data.exist;
        this.option = this.exist ? this.options[1] : this.options[0];
        if (this.exist) {
          this.tutor.id = data.tutor.id;
          this.tutor.created_at = data.tutor.created_at;
          this.tutor.updated_at = data.tutor.updated_at;
          // Adjusting time to time-zone
          const gmtCreated = moment.utc(this.tutor.created_at);
          const gmtUpdated = moment.utc(this.tutor.updated_at);
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
      this._tutorService.createTutor(this.tutor, this.user).subscribe(
        (data) => {
          this.option = this.options[2];
          this.exist = this.saved = true;
          this.toast.show(`El tutor ${data.user.fullname} ha sido creado!`, 4000, 'green');
          // console.log(data);
        }, err => {
          console.log(err);
        }
      );
    } else {
      this._tutorService.updateTutor(this.tutor, this.user).subscribe(
        (data) => {
          this.option = this.options[2];
          this.saved = true;
          this.toast.show(`El tutor ${data.user.fullname} ha sido actualizado!`, 4000, 'green');
        }, err => {
          console.log(err);
        }
      );
    }
    this.loading = false;
  }

  splitFullname() {
    const fullname: string = this.tutor.fullname;
    const arrName = fullname.split(' ');

    this.tutor.lastname = arrName[0];
    this.tutor.m_lastname = arrName[1];
    this.tutor.name = arrName[3] ? arrName[2] + ' ' + arrName[3] : arrName[2];
    // console.log(this.tutor.name);
  }

  generateUser() {
    this.splitFullname();
    this.user.fullname = this.tutor.m_lastname ?
      `${this.tutor.name} ${this.tutor.lastname} ${this.tutor.m_lastname}` :
      `${this.tutor.name} ${this.tutor.lastname}`;
    this.user.username = this.tutor.worker_number;
    this.user.password = this.tutor.worker_number;
    this.user.level = 1;
    this.user.access = 1;
    this.user.email = this.tutor.alt_email;
    this.tutor.alt_email = '';

    // console.log({ tutor: this.tutor, user: this.user });
  }

}
