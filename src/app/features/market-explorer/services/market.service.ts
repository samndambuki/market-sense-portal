import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Market } from '../models/market.model';

@Injectable({
  providedIn: 'root',
})
export class MarketService {
  constructor(private http: HttpClient) {}
  readonly markets = signal<Market[]>([]);
}
