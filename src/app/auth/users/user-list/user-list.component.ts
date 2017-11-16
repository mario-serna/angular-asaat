import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../common/services/authentication.service';
import { UsersService } from '../services/users.service';
import { User } from '../models/user';
import { MzMediaService, Media, MzToastService } from 'ng2-materialize';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: Array<User> = [];
  loginUser: User;
  selectedUser: User;
  isLoading = true;
  swapView = true;
  showSearch = false;
  resolution: Media;
  smallResolution = false;

  constructor(
    private _authService: AuthenticationService,
    private _userService: UsersService,
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

    this.loginUser = this._authService.getUser();

    this._userService.getUsers().subscribe(
      (data) => {
        this.users = data.filter(user => user.id !== this.loginUser.id);
        this.isLoading = false;
        // console.log(this.loginUser);
      }, err => {
        this.isLoading = false;
        console.log(err);
      }, () => {
        // console.log('Get Users Finished!');
      }
    );
  }

  deleteUser() {
    this._userService.deleteUser(this.selectedUser.id).subscribe(
      (data) => {
        this.users.filter(user => user !== data);
        this.selectedUser = null;
        this.toast.show(`El usuario ${data.username} ha sido eliminado!`, 4000, 'green');
      }, err => {
        this.toast.show(`Ha ocurrido un problema al eliminar el usuario ${this.selectedUser.username}`, 4000, 'red');
      });
  }

}
