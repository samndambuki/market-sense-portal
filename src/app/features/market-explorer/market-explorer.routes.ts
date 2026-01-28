import { Routes } from '@angular/router';
import { MarketListComponent } from './pages/market-list/market-list.component';

export const MARKET_EXPLORER_ROUTES: Routes = [
  {
    path: '',
    component: MarketListComponent,
  },
];
