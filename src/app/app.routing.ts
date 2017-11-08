import { Routes } from '@angular/router';
import { AuthGuard } from './common/guards/auth.guard';
import { PublicGuard } from './common/guards/public.guard';
import { LoginComponent } from './public/login/login.component';
import { NotFoundComponent } from './common/not-found/not-found.component';
import { HomeComponent } from './public/home/home.component';

export const routes: Routes = [
    {
        path: '', pathMatch: 'full', redirectTo: '/login'
    },
    {
        path: 'login', component: LoginComponent, pathMatch: 'full', canActivate: [PublicGuard]
    },
    {
        path: 'home', component: HomeComponent, data: { name: 'Página principal' }, canActivate: [AuthGuard]
    },
    {
        path: '**', component: NotFoundComponent
    }
];
