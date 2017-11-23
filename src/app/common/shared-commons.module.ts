import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { RolePipe } from './pipes/role.pipe';
import { AccessPipe } from './pipes/access.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CapitalizePipe,
    RolePipe,
    AccessPipe
  ],
  exports: [
    CapitalizePipe,
    RolePipe,
    AccessPipe
  ]
})
export class SharedCommonsModule { }
