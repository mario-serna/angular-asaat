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
import { UsersModule } from './auth/users/users.module';

@NgModule({
  imports: [
    HttpModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterializeModule,
    FormsModule,
    Ng2Webstorage,
    UsersModule,
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
