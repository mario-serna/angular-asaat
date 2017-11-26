import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterializeModule } from 'ng2-materialize';
import { Ng2Webstorage } from 'ng2-webstorage';

// Services
import { HttpService } from './auth/common-services/http.service';
import { AuthenticationService } from './common/services/authentication.service';

// Guards
import { AuthGuard } from './common/guards/auth.guard';
import { PublicGuard } from './common/guards/public.guard';

// Components
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { LoginComponent } from './public/login/login.component';
import { HeaderComponent } from './common/header/header.component';

import { NotFoundComponent } from './common/not-found/not-found.component';
import { HomeComponent } from './auth/home/home.component';

// Modules
import { SharedCommonsModule } from './common/shared-commons.module';
import { UsersModule } from './auth/users/users.module';
import { TutorsModule } from './auth/tutors/tutors.module';
import { SectionsModule } from './auth/sections/sections.module';
import { StudentsModule } from './auth/students/students.module';
import { AdminModule } from './auth/admin/admin.module';

@NgModule({
  imports: [
    HttpModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterializeModule,
    FormsModule,
    Ng2Webstorage,
    SharedCommonsModule,
    UsersModule,
    TutorsModule,
    SectionsModule,
    StudentsModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    NotFoundComponent,
    HomeComponent
  ],
  providers: [HttpService, AuthenticationService, AuthGuard, PublicGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
