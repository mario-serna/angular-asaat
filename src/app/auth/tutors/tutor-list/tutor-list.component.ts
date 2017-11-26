import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../common/services/authentication.service';
import { TutorsService } from '../services/tutors.service';
import { Tutor } from '../models/tutor';
import { MzMediaService, Media, MzToastService } from 'ng2-materialize';

@Component({
  selector: 'app-tutor-list',
  templateUrl: './tutor-list.component.html',
  styleUrls: ['./tutor-list.component.css']
})
export class TutorListComponent implements OnInit {
  tutors: Array<Tutor> = [];
  selectedTutor: any;
  isLoading = true;
  swapView = true;
  showSearch = false;
  resolution: Media;
  smallResolution = false;

  constructor(
    private _tutorService: TutorsService,
    private mediaService: MzMediaService,
    private toast: MzToastService
  ) { }

  ngOnInit() {
    this.mediaService.isActive('s').subscribe((data) => {
      // If resolution is small then return true and change to list view
      if (data) {
        this.swapView = false;
        this.smallResolution = true;
      } else {
        this.smallResolution = false;
      }
    });

    this._tutorService.getTutors().subscribe(
      (data) => {
        this.tutors = data;
        this.isLoading = false;
      }, err => {
        this.isLoading = false;
        console.log(err);
      }, () => {
        // console.log('Get Tutors Finished!');
      }
    );
  }

  deleteTutor() {
    this._tutorService.deleteTutor(this.selectedTutor.id).subscribe(
      (data) => {
        this.tutors = this.tutors.filter(tutor => tutor.id !== data.tutor.id);
        this.selectedTutor = null;
        this.toast.show(`El tutor ${data.user.fullname} ha sido eliminado!`, 4000, 'green');
      }, err => {
        this.toast.show(`Ha ocurrido un problema al eliminar el tutor ${this.selectedTutor.fullname}`, 4000, 'red');
      });
  }

}
