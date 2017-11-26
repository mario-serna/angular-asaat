import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MzMediaService, Media, MzToastService } from 'ng2-materialize';
import { StudentsService } from '../services/students.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  section_id: number;
  students: Array<any> = [];
  selectedStudent: any;
  isLoading = true;
  swapView = true;
  showSearch = false;
  resolution: Media;
  smallResolution = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _studentsService: StudentsService,
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

    const url = this.router.url.split('/');
    // console.log(url);
    if (url.length > 2) {
      // If url.length is equal to 4 then is fast access from header
      this.section_id = url.length === 4 ? +url[2] : +url[4];
      this._studentsService.searchStudentBy('section_id', this.section_id).subscribe(
        (data) => {
          this.students = data.students;
          this.isLoading = false;
          // console.log(this.sections);
        }, err => {
          this.isLoading = false;
          console.log(err);
        }, () => {
          // console.log('Get Tutors Finished!');
        }
      );
    } else {
      this._studentsService.getStudents().subscribe(
        (data) => {
          this.students = data;
          this.isLoading = false;
          // console.log(this.sections);
        }, err => {
          this.isLoading = false;
          console.log(err);
        }, () => {
          // console.log('Get Tutors Finished!');
        }
      );
    }
  }

  delete() {
    this._studentsService.deleteStudent(this.selectedStudent.id).subscribe(
      (data) => {
        this.students = this.students.filter(student => student.id !== data.student.id);
        this.selectedStudent = null;
        this.toast.show(`El alumno ${data.user.fullname} ha sido eliminado!`, 4000, 'green');
      }, err => {
        console.log(err);
        this.toast.show(`Ha ocurrido un problema al eliminar el alumno ${this.selectedStudent.fullname}`, 4000, 'red');
      });
  }
}
