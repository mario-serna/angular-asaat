import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './common/guards/auth.guard';
import { PublicGuard } from './common/guards/public.guard';
import { LoginComponent } from './public/login/login.component';
import { NotFoundComponent } from './common/not-found/not-found.component';
import { HomeComponent } from './auth/home/home.component';

const appRoutes: Routes = [
    {
        path: 'login', component: LoginComponent, canActivate: [PublicGuard]
    },
    {
        path: 'home', component: HomeComponent, data: { title: 'Home' }, canActivate: [AuthGuard]
    },
    {
        path: '', redirectTo: '/login', pathMatch: 'full'
    },
    {
        path: '**', component: NotFoundComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
