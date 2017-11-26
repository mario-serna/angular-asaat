import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterializeModule } from 'ng2-materialize';
import { SharedCommonsModule } from '../../common/shared-commons.module';

import { SectionsRoutingModule } from './sections-routing.module';
import { SectionsService } from './services/sections.service';
import { SectionsComponent } from './sections.component';
import { SectionListComponent } from './section-list/section-list.component';
import { SectionNewComponent } from './section-new/section-new.component';
import { SectionFormComponent } from './section-form/section-form.component';
import { SectionDetailComponent } from './section-detail/section-detail.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterializeModule,
    SharedCommonsModule,
    SectionsRoutingModule
  ],
  declarations: [
    SectionsComponent,
    SectionListComponent,
    SectionNewComponent,
    SectionFormComponent,
    SectionDetailComponent
  ],
  providers: [SectionsService],
  exports: [
    SectionsComponent
  ]
})
export class SectionsModule { }
