import { Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthPageComponent } from './auth/auth-page/auth-page.component';
import { AuthGuard } from './AuthGuards/auth.guard';
import { GuestGuard } from './AuthGuards/guest.guard';
import { ClientsComponent } from './pages/hr/clients/clients.component';
import { DepartmentsComponent } from './pages/hr/departments/departments.component';
import { UsersComponent } from './pages/hr/users/users.component';
import { TeamsComponent } from './pages/hr/teams/teams.component';
import { JobTitlesComponent } from './pages/hr/jobtitles/jobtitles.component';
import { ProjectsComponent } from './pages/work/projects/projects.component';
import { LeaveAllocationsComponent } from './pages/leaves/leave-allocations/leave-allocations.component';
import { TimesheetsComponent } from './pages/work/timesheets/timesheets.component';
import { LeaveRequestsComponent } from './pages/leaves/leave-requests/leave-requests.component';

export const routes: Routes = [

  { path: 'login', component: AuthPageComponent, canActivate: [GuestGuard] },

  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
       { path: 'hr/clients', component: ClientsComponent },
       { path: 'hr/users', component: UsersComponent },
       { path: 'hr/teams', component: TeamsComponent },
       { path: 'hr/jobtitles', component: JobTitlesComponent },
       { path: 'hr/departments', component: DepartmentsComponent },
       { path: 'work/projects', component: ProjectsComponent },
       { path: 'work/timesheets', component: TimesheetsComponent },
       { path: 'leaves/leave-allocations', component: LeaveAllocationsComponent },
       { path: 'leaves/leave-requests', component: LeaveRequestsComponent },
       { path: 'hr/departments', component: DepartmentsComponent },
    ]
  },

  { path: '**', redirectTo: 'login' }
];0