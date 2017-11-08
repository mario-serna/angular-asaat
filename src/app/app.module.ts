import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterializeModule } from 'ng2-materialize';
import { Ng2Webstorage } from 'ng2-webstorage';

import { HttpService } from './auth/common-services/http.service';
import { AuthenticationService } from './common/services/authentication.service';

import { AuthGuard } from './common/guards/auth.guard';
import { PublicGuard } from './common/guards/public.guard';

import { AppComponent } from './app.component';
import { LoginComponent } from './public/login/login.component';
import { HeaderComponent } from './common/header/header.component';
import { routes } from './app.routing';
import { NotFoundComponent } from './common/not-found/not-found.component';
import { HomeComponent } from './public/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    NotFoundComponent,
    HomeComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterializeModule,
    RouterModule.forRoot(routes),
    FormsModule,
    Ng2Webstorage
  ],
  providers: [HttpService, AuthenticationService, AuthGuard, PublicGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
