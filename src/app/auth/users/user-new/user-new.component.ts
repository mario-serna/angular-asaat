import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MzToastService } from 'ng2-materialize';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.css']
})
export class UserNewComponent implements OnInit {
  user: any = <any>{};
  response: any = null;
  levels = [
    { name: 'Administrador', value: 0 },
    { name: 'Tutor', value: 1 },
    { name: 'Alumno', value: 2 }
  ];

  constructor(
    private router: Router,
    private _usersService: UsersService,
    private toast: MzToastService
  ) { }

  ngOnInit() {
  }

  saveUser(event: Event) {
    event.preventDefault();

    this._usersService.createUser(this.user).subscribe(
      (data) => {
        this.user = data;
        this.toast.show(`El usuario ${data.username} ha sido creado!`, 4000, 'green');
        this.router.navigate(['users']);
      }, err => {
        this.toast.show(`Ha ocurrido un problema al crear el usuario ${this.user.username}`, 4000, 'red');
        this.response = err.status;
        console.log(this.response);
      });
  }
}
