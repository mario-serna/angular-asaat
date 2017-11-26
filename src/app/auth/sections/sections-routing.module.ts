import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SectionsComponent } from './sections.component';
import { SectionListComponent } from './section-list/section-list.component';
import { SectionNewComponent } from './section-new/section-new.component';
import { SectionDetailComponent } from './section-detail/section-detail.component';
import { AuthGuard } from '../../common/guards/auth.guard';

const sectionsRoutes: Routes = [
  {
    path: '',
    component: SectionsComponent,
    data: { title: 'Secciones' },
    canActivate: [AuthGuard],
    children: [
      {
        path: 'sections',
        canActivateChild: [AuthGuard],
        children: [
          {
            path: '', component: SectionListComponent
          },
          {
            path: 'new', component: SectionNewComponent
          },
          {
            path: ':id', component: SectionDetailComponent,
            children: [
              {
                path: '',
                loadChildren: 'app/auth/students/students.module#StudentsModule'
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
    RouterModule.forChild(sectionsRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class SectionsRoutingModule { }
