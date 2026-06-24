import { Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthPageComponent } from './auth/auth-page/auth-page.component';
import { AuthGuard } from './AuthGuards/auth.guard';
import { GuestGuard } from './AuthGuards/guest.guard';

export const routes: Routes = [

  { path: 'login', component: AuthPageComponent, canActivate: [GuestGuard] },

  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
    ]
  },

  { path: '**', redirectTo: 'login' }
];0