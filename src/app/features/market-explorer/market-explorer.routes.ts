import { Routes } from '@angular/router';

export const MARKET_EXPLORER_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/market-list/market-list.component').then(
        (m) => m.MarketListComponent
      ),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./pages/market-detail/market-detail.component').then(
        (m) => m.MarketDetailComponent
      ),
  },
];
