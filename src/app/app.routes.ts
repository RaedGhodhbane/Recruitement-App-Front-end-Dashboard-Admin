import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { CandidatesListComponent } from './candidates-list/candidates-list.component';
import { RecruitersListComponent } from './recruiters-list/recruiters-list.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { ContactComponent } from './contact/contact.component';

export const routes: Routes = [
    {path:'', component: LayoutComponent},
    {path:'login', component: LoginComponent},
    {path:'candidatesList', component: CandidatesListComponent},
    {path:'recruitersList', component: RecruitersListComponent},
    {path: 'profileAdmin', component: ProfileComponent},
    {path:'usersList', component: UsersComponent},
    {path:'contactMessages', component:ContactComponent}
];
