import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'markets',
    loadChildren: () =>
      import('./features/market-explorer/market-explorer.routes').then(
        (m) => m.MARKET_EXPLORER_ROUTES
      ),
  },
  {
    path: '',
    redirectTo: 'markets',
    pathMatch: 'full',
  },
];
