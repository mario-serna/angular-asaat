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
    data: { title: 'Usuarios' },
    canActivate: [AuthGuard],
    children: [
      {
        path: 'users',
        canActivateChild: [AuthGuard],
        children: [
          {
            path: '', component: UserListComponent
          },
          {
            path: 'new', component: UserNewComponent
          },
          {
            path: 'detail/:id', component: UserDetailComponent
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
