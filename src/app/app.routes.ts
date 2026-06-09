import { Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout/layout.component';
import { RegisterComponent } from './features/auth/pages/register/register.component';
import { LoginComponent } from './features/auth/pages/login/login.component';

export const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
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
        path: '',
        redirectTo: 'markets',
        pathMatch: 'full',
      },
      {
        path: 'competitor-analysis',
        loadChildren: () =>
          import('./features/competitor-analysis/competitor-analysis.routes').then(
            (m) => m.COMPETITOR_ANALYSIS_ROUTES,
          ),
      },
    ],
  },
];
