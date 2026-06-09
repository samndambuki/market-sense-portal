import { Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout/layout.component';
import { RegisterComponent } from './features/auth/pages/register/register.component';
import { LoginComponent } from './features/auth/pages/login/login.component';

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
    component: LayoutComponent,
    children: [
      {
        path: 'markets',
        loadChildren: () =>
          import('./features/market-explorer/market-explorer.routes').then(
            (m) => m.MARKET_EXPLORER_ROUTES,
          ),
      },
      {
        path: 'competitor-analysis',
        loadChildren: () =>
          import('./features/competitor-analysis/competitor-analysis.routes').then(
            (m) => m.COMPETITOR_ANALYSIS_ROUTES,
          ),
      },
      {
        path: '',
        redirectTo: 'markets',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
