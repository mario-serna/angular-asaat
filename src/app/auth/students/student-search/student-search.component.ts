import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

import { StudentsService } from '../services/students.service';

@Component({
  selector: 'app-student-search',
  templateUrl: './student-search.component.html',
  styleUrls: ['./student-search.component.css']
})
export class StudentSearchComponent implements OnInit {
  @Output() onSearch = new EventEmitter<boolean>();
  showResult = false;

  students: Observable<any[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private _studentsService: StudentsService,
    private router: Router
  ) { }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit() {
    this.students = this.searchTerms
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => term
        ? this._studentsService.searchStudent(term)
        : Observable.of<any[]>([])).catch(error => {
          console.log(error);
          return Observable.of<any[]>([]);
        });
  }

  gotoDetail(student: any): void {
    this.showResult = false;
    this.onSearch.emit(false);
    this.router.navigate(['students/', student.id]);
  }
}
