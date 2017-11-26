import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

import { TutorsService } from '../services/tutors.service';
import { Tutor } from '../models/tutor';

@Component({
  selector: 'app-tutor-search',
  templateUrl: './tutor-search.component.html',
  styleUrls: ['./tutor-search.component.css']
})

export class TutorSearchComponent implements OnInit {
  @Output() onSearch = new EventEmitter<boolean>();
  showResult = false;

  tutors: Observable<Tutor[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private _tutorService: TutorsService,
    private router: Router
  ) { }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit() {
    this.tutors = this.searchTerms
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => term
        ? this._tutorService.searchTutor(term)
        : Observable.of<Tutor[]>([])).catch(error => {
          console.log(error);
          return Observable.of<Tutor[]>([]);
        });
  }

  gotoDetail(tutor: Tutor): void {
    this.showResult = false;
    this.onSearch.emit(false);
    this.router.navigate(['tutors/', tutor.id]);
  }

}
