import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterializeModule } from 'ng2-materialize';
import { SharedCommonsModule } from '../../common/shared-commons.module';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentsService } from './services/students.service';
import { StudentsComponent } from './students.component';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentNewComponent } from './student-new/student-new.component';
import { StudentFormComponent } from './student-form/student-form.component';
import { StudentDetailComponent } from './student-detail/student-detail.component';
import { StudentDataComponent } from './student-data/student-data.component';
import { StudentLoadFileComponent } from './student-load-file/student-load-file.component';
import { StudentSearchComponent } from './student-search/student-search.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterializeModule,
    SharedCommonsModule,
    StudentsRoutingModule
  ],
  declarations: [
    StudentsComponent,
    StudentListComponent,
    StudentNewComponent,
    StudentFormComponent,
    StudentDetailComponent,
    StudentDataComponent,
    StudentLoadFileComponent,
    StudentSearchComponent
  ],
  providers: [StudentsService]
})
export class StudentsModule { }
