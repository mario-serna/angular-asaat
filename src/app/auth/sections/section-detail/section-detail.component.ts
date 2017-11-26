import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MzToastService } from 'ng2-materialize';
import { SectionsService } from '../services/sections.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-section-detail',
  templateUrl: './section-detail.component.html',
  styleUrls: ['./section-detail.component.css']
})
export class SectionDetailComponent implements OnInit {
  section: any = <any>{};
  tutor: any = <any>{};
  isLoading = true;
  response: any = null;
  sectionData = { section: {}, tutor: {} };
  sectionsUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _sectionsService: SectionsService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id: number = params['id'];
      this._sectionsService.getSection(id).subscribe(
        (data) => {
          this.section = data.section;
          this.isLoading = false;
          this.sectionData.section = this.section;
          this.sectionData.tutor = this.tutor;
          this.sectionsUrl = `${this.router.url}/sections`;
          // console.log(this.tutorData);
        }, err => {
          this.response = JSON.parse(err._body);
          this.isLoading = false;
          this.section = null;
          this.tutor = null;
          console.log(this.response);
        });
    });
  }
}
