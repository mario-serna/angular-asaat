import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterializeModule } from 'ng2-materialize';
import { SharedCommonsModule } from '../../common/shared-commons.module';

import { TutorsRoutingModule } from './tutors-routing.module';
import { TutorsComponent } from './tutors.component';
import { TutorListComponent } from './tutor-list/tutor-list.component';
import { TutorNewComponent } from './tutor-new/tutor-new.component';
import { TutorSearchComponent } from './tutor-search/tutor-search.component';
import { TutorDetailComponent } from './tutor-detail/tutor-detail.component';
import { TutorsService } from './services/tutors.service';
import { TutorLoadFileComponent } from './tutor-load-file/tutor-load-file.component';
import { TutorDataComponent } from './tutor-data/tutor-data.component';
import { TutorFormComponent } from './tutor-form/tutor-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterializeModule,
    SharedCommonsModule,
    TutorsRoutingModule
  ],
  declarations: [
    TutorsComponent,
    TutorListComponent,
    TutorNewComponent,
    TutorSearchComponent,
    TutorDetailComponent,
    TutorLoadFileComponent,
    TutorDataComponent,
    TutorFormComponent
  ],
  providers: [
    TutorsService
  ]
})
export class TutorsModule { }
