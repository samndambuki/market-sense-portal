import { Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout/layout.component';
import { RegisterComponent } from './features/auth/pages/register/register.component';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { authGuard } from './core/guards/auth.guard';
import { DashboardComponent } from './features/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    canActivate: [authGuard],
    component: LayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'markets',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./features/market-explorer/market-explorer.routes').then(
            (m) => m.MARKET_EXPLORER_ROUTES,
          ),
      },
      {
        path: 'competitor-analysis',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./features/competitor-analysis/competitor-analysis.routes').then(
            (m) => m.COMPETITOR_ANALYSIS_ROUTES,
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
