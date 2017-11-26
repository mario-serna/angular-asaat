import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { SectionsService } from '../services/sections.service';
import { MzMediaService, Media, MzToastService } from 'ng2-materialize';

@Component({
  selector: 'app-section-list',
  templateUrl: './section-list.component.html',
  styleUrls: ['./section-list.component.css']
})
export class SectionListComponent implements OnInit {
  tutor_id: number;
  sections: any[] = [];
  selectedSection: any;
  isLoading = true;
  swapView = true;
  showSearch = false;
  resolution: Media;
  smallResolution = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _sectionsService: SectionsService,
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
    this.tutor_id = +url[2];

    if (url.length > 3) {
      this._sectionsService.searchSectionBy('tutor_id', this.tutor_id).subscribe(
        (data) => {
          this.sections = data.sections;
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
      this._sectionsService.getSections().subscribe(
        (data) => {
          this.sections = data;
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
    this._sectionsService.deleteSection(this.selectedSection.id).subscribe(
      (data) => {
        this.sections = this.sections.filter(section => section.id !== data.section.id);
        this.selectedSection = null;
        this.toast.show(`La sección ${data.section.key} ha sido eliminada!`, 4000, 'green');
      }, err => {
        this.toast.show(`Ha ocurrido un problema al eliminar la sección ${this.selectedSection.key}`, 4000, 'red');
      });
  }

}
