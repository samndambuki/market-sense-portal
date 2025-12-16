import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Market } from '../models/market.model';
import { API_ENDPOINTS } from '../../../core/config/api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class MarketService {
  markets: Market[] = [];
  loading: boolean | string = false;
  error: boolean | null = null;
  constructor(private http: HttpClient) {}
  loadMarkets() {
    this.loading = true;
    this.error = null;
    this.http.get<Market[]>(API_ENDPOINTS.markets).subscribe({
      next: (data) => {
        this.markets = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.error = true;
      },
    });
  }
  getMarket(id: number) {
    return this.http.get<Market>(`${API_ENDPOINTS.markets}/${id}`);
  }
}
