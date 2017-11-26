import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TutorsComponent } from './tutors.component';
import { TutorListComponent } from './tutor-list/tutor-list.component';
import { TutorNewComponent } from './tutor-new/tutor-new.component';
import { TutorDetailComponent } from './tutor-detail/tutor-detail.component';
import { AuthGuard } from '../../common/guards/auth.guard';

const tutorsRoutes: Routes = [
  {
    path: '',
    component: TutorsComponent,
    data: { title: 'Tutores' },
    canActivate: [AuthGuard],
    children: [
      {
        path: 'tutors',
        canActivateChild: [AuthGuard],
        children: [
          {
            path: '', component: TutorListComponent
          },
          {
            path: 'new', component: TutorNewComponent
          },
          {
            path: ':id', component: TutorDetailComponent,
            children: [
              {
                path: '',
                loadChildren: 'app/auth/sections/sections.module#SectionsModule'
              }
            ]
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(tutorsRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class TutorsRoutingModule { }
