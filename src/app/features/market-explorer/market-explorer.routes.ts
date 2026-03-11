import { Routes } from '@angular/router';
import { MarketListComponent } from './pages/market-list/market-list.component';
import { MarketDetailComponent } from './pages/market-detail/market-detail.component';

export const MARKET_EXPLORER_ROUTES: Routes = [
  {
    path: '',
    component: MarketListComponent,
  },
  { path: ':id', component: MarketDetailComponent },
];
