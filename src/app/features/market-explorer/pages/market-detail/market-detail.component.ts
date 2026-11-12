import { Component, OnInit, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { marked } from 'marked';
import { Market } from '../../models/market.model';
import { MarketService } from '../../services/market.service';

@Component({
  selector: 'app-market-detail',
  imports: [RouterLink],
  templateUrl: './market-detail.component.html',
  styleUrl: './market-detail.component.scss',
})
export class MarketDetailComponent implements OnInit {
  private marketService = inject(MarketService);
  private route = inject(ActivatedRoute);

  private marketId = 0;

  market: Market | null = null;
  isLoadingMarket = true;
  marketError: 'not-found' | 'failed' | null = null;

  insightsHtml = '';
  isLoadingInsights = false;
  insightsError = false;

  ngOnInit(): void {
    this.marketId = Number(this.route.snapshot.paramMap.get('id'));
    // Both requests only need the id, so run them at the same time
    this.loadMarket();
    this.loadInsights();
  }

  loadMarket(): void {
    this.isLoadingMarket = true;
    this.marketError = null;

    this.marketService.getMarket(this.marketId).subscribe({
      next: (data) => {
        this.market = data;
        this.isLoadingMarket = false;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Failed to load market', error);
        this.isLoadingMarket = false;
        this.marketError =
          error.status === 404 || error.status === 400 ? 'not-found' : 'failed';
      },
    });
  }

  loadInsights(): void {
    this.isLoadingInsights = true;
    this.insightsError = false;

    this.marketService.getMarketAIInsights({ id: this.marketId }).subscribe({
      next: (res) => {
        const text: string = res?.analysis ?? res?.text ?? '';
        // The AI replies in Markdown (## headings, - bullets, **bold**).
        // Angular sanitises [innerHTML], so the generated HTML is safe to show.
        this.insightsHtml = marked.parse(text, { async: false }) as string;
        this.isLoadingInsights = false;
      },
      error: (error) => {
        console.error('Failed to load AI insights', error);
        this.insightsError = true;
        this.isLoadingInsights = false;
      },
    });
  }

  growthLevel(rate: number): 'High' | 'Medium' | 'Low' {
    return rate >= 15 ? 'High' : rate >= 10 ? 'Medium' : 'Low';
  }

  /** "HIGH" -> "High" */
  riskLabel(risk: string): string {
    return risk
      ? risk.charAt(0).toUpperCase() + risk.slice(1).toLowerCase()
      : '';
  }
}
