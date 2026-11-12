import { Component, OnInit, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { marked } from 'marked';
import { API_ENDPOINTS } from '../../../../core/config/api-endpoints';
import { Market } from '../../../market-explorer/models/market.model';
import { MarketService } from '../../../market-explorer/services/market.service';

@Component({
  selector: 'app-competitor-analysis',
  imports: [FormsModule, RouterLink],
  templateUrl: './competitor-analysis.component.html',
  styleUrl: './competitor-analysis.component.scss',
})
export class CompetitorAnalysisComponent implements OnInit {
  private http = inject(HttpClient);
  private marketService = inject(MarketService);

  markets: Market[] = [];
  loadingMarkets = false;
  marketsError = false;

  selectedMarketId: number | null = null;

  /** The market the current result belongs to (stays put if the user picks another one) */
  analysedMarket: Market | null = null;
  analysisHtml = '';
  loading = false;
  error = '';

  /** What the AI covers, shown before the first analysis */
  readonly sections = [
    'Major competitors',
    'Competitive advantages',
    'Market positioning',
    'Emerging opportunities',
    'Competitive risks',
  ];

  ngOnInit(): void {
    this.getMarkets();
  }

  get selectedMarket(): Market | undefined {
    return this.markets.find((m) => m.id === this.selectedMarketId);
  }

  getMarkets(): void {
    this.loadingMarkets = true;
    this.marketsError = false;

    this.marketService.loadMarkets().subscribe({
      next: (markets) => {
        this.markets = [...markets].sort((a, b) =>
          a.name.localeCompare(b.name),
        );
        this.loadingMarkets = false;
      },
      error: (error) => {
        console.error('Failed to load markets', error);
        this.marketsError = true;
        this.loadingMarkets = false;
      },
    });
  }

  analyze(): void {
    const market = this.selectedMarket;
    if (!market) return;

    this.loading = true;
    this.error = '';
    this.analysisHtml = '';
    this.analysedMarket = market;

    this.http
      .get<{ analysis: string }>(API_ENDPOINTS.competitorAnalysis, {
        params: { marketName: market.name },
      })
      .subscribe({
        next: (res) => {
          // The AI replies in Markdown; Angular sanitises [innerHTML]
          this.analysisHtml = marked.parse(res.analysis ?? '', {
            async: false,
          }) as string;
          this.loading = false;
        },
        error: (err: HttpErrorResponse) => {
          console.error('Competitor analysis failed', err);
          this.error =
            err.status === 0
              ? 'Can’t reach the server. Check your connection and try again.'
              : 'Couldn’t generate the analysis. The AI service may be busy. Try again.';
          this.loading = false;
        },
      });
  }
}
