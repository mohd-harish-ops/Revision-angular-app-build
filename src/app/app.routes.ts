import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    title: 'Dashboard | Job Tracker',
    loadComponent: () => import('./pages/dashboard/dashboard.component').then((m) => m.DashboardComponent),
  },
  {
    path: 'applications',
    title: 'Applications | Job Tracker',
    loadComponent: () =>
      import('./pages/applications/applications.component').then((m) => m.ApplicationsComponent),
  },
  { path: '**', redirectTo: '' },
];
