import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { CandidatesListComponent } from './candidates-list/candidates-list.component';
import { RecruitersListComponent } from './recruiters-list/recruiters-list.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { ContactComponent } from './contact/contact.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {path:'', component: LayoutComponent, canActivate:[authGuard]},
    {path:'login', component: LoginComponent},
    {path:'candidatesList', component: CandidatesListComponent, canActivate: [authGuard]},
    {path:'recruitersList', component: RecruitersListComponent, canActivate: [authGuard]},
    {path: 'profileAdmin', component: ProfileComponent, canActivate: [authGuard]},
    {path:'usersList', component: UsersComponent, canActivate: [authGuard]},
    {path:'contactMessages', component:ContactComponent, canActivate: [authGuard]}
];
