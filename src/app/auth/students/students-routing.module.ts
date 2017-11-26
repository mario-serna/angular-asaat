import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../common/guards/auth.guard';
import { StudentsComponent } from './students.component';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentNewComponent } from './student-new/student-new.component';
import { StudentDetailComponent } from './student-detail/student-detail.component';

const studentsRoutes: Routes = [
  {
    path: '',
    component: StudentsComponent,
    data: { title: 'Alumnos' },
    canActivate: [AuthGuard],
    children: [
      {
        path: 'students',
        canActivateChild: [AuthGuard],
        children: [
          {
            path: '', component: StudentListComponent
          },
          {
            path: 'new', component: StudentNewComponent
          },
          {
            path: ':id', component: StudentDetailComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(studentsRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class StudentsRoutingModule { }
