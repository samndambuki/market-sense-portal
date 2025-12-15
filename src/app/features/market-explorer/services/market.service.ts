import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Market } from '../models/market.model';
import { API_ENDPOINTS } from '../../../core/config/api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class MarketService {
  constructor(private http: HttpClient) {}
  markets: Market[] = [];
  loading: boolean = false;
  error: boolean | null = null;

  loadMarkets(): void {
    this.loading = true;
    this.error = null;

     this.http.get<Market[]>(API_ENDPOINTS.markets).subscribe({
      next: (data) => {
        this.markets = data;
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      },
    });
  }

  getMarket(id: number) {
    return this.http.get<Market>(`${API_ENDPOINTS.markets}/${id}`);
  }
}
