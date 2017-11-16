import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MzToastService } from 'ng2-materialize';
import { UsersService } from '../services/users.service';
import { User } from '../models/user';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user: User;
  isLoading = true;
  response: any = null;
  levels = [
    { name: 'Administrador', value: 0 },
    { name: 'Tutor', value: 1 },
    { name: 'Alumno', value: 2 }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _usersService: UsersService,
    private toast: MzToastService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id: number = params['id'];
      this._usersService.getUser(id).subscribe(
        (data) => {
          this.user = data;
        }, err => {
          console.log(err);
        }, () => {
          this.isLoading = false;
        });
    });
  }

  updateUser(event: Event) {
    event.preventDefault();
    this._usersService.updateUser(this.user).subscribe(
      (data) => {
        this.user = data;
        this.toast.show(`Se han guardado los cambios!`, 4000, 'green');
      }, err => {
        this.toast.show(`Ha ocurrido un error al realizar los cambios!`, 4000, 'red');
        this.response = err.status;
        console.log(this.response);
      });
  }

}
