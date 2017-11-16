import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserNewComponent } from './user-new/user-new.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { AuthGuard } from '../../common/guards/auth.guard';

const usersRoutes: Routes = [
  {
    path: '',
    component: UsersComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          {
            path: 'users', component: UserListComponent
          },
          {
            path: 'users/new', component: UserNewComponent
          },
          {
            path: 'users/detail/:id', component: UserDetailComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(usersRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class UsersRoutingModule { }
