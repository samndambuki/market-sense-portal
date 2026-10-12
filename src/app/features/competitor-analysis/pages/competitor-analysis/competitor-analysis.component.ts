import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { API_ENDPOINTS } from '../../../../core/config/api-endpoints';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-competitor-analysis',
  imports: [CommonModule, FormsModule],
  templateUrl: './competitor-analysis.component.html',
  styleUrl: './competitor-analysis.component.scss',
})
export class CompetitorAnalysisComponent implements OnInit {
  market: string = '';
  selectedMarket = '';
  loadingMarkets: boolean = false;
  markets: any;
  analysis: string = '';
  loading: boolean = false;
  error = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getMarkets();
  }

  getMarkets() {
    this.loadingMarkets = true;
    this.error = '';
    this.http.get<any>(API_ENDPOINTS.markets).subscribe({
      next: (markets) => {
        this.markets = markets;
        this.loadingMarkets = false;
        console.log('markets', this.markets);
      },
      error: (error) => {
        console.error('Failed to load markets', error);
        this.error = 'Failed to load markets. Please try again';
        this.loadingMarkets = false;
      },
    });
  }

  analyze() {
    if (!this.selectedMarket) {
      this.error = 'Please select a market';
      return;
    }

    const market = this.markets.find(
      (item: any) => item.name === this.selectedMarket,
    );

    if (!market) {
      this.error = 'Selected Market could not be found';
      return;
    }

    this.loading = true;
    this.error = '';
    this.analysis = '';

    this.http
      .get<any>(API_ENDPOINTS.competitoranalysis, {
        params: { marketName: market.name },
      })
      .subscribe({
        next: (res) => {
          this.analysis = res.analysis;
          this.loading = false;
        },
        error: (err) => {
          console.error('Competitor Analysis failed', err);
          this.error =
            err.error?.message || 'Failed to generate competitor analysis';
          this.loading = false;
        },
      });
  }
}
