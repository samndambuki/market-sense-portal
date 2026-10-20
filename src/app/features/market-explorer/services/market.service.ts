import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Market } from '../models/market.model';
import { API_ENDPOINTS } from '../../../core/config/api-endpoints';
import { finalize, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MarketService {
  loading: boolean | string = false;
  error: boolean | null = null;
  constructor(private http: HttpClient) {}

  loadMarkets(): Observable<Market[]> {
    this.loading = true;
    this.error = null;
    return this.http.get<Market[]>(API_ENDPOINTS.markets).pipe(
      finalize(() => {
        this.loading = false;
      }),
    );
  }

  getMarket(id: number) {
    return this.http.get<Market>(`${API_ENDPOINTS.markets}/${id}`);
  }
  getMarketAIInsights(market: any): Observable<any> {
    return this.http.get(`${API_ENDPOINTS.marketSummary}/${market.id}`);
  }
}
