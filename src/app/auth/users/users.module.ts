import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterializeModule } from 'ng2-materialize';
import { SharedCommonsModule } from '../../common/shared-commons.module';

import { UsersService } from './services/users.service';

import { UsersComponent } from './users.component';
import { UserListComponent } from './user-list/user-list.component';

import { UsersRoutingModule } from './users-routing.module';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserNewComponent } from './user-new/user-new.component';
import { UserSearchComponent } from './user-search/user-search.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterializeModule,
    SharedCommonsModule,
    UsersRoutingModule
  ],
  declarations: [
    UsersComponent,
    UserListComponent,
    UserDetailComponent,
    UserNewComponent,
    UserSearchComponent
  ],
  providers: [
    UsersService
  ]
})
export class UsersModule { }
