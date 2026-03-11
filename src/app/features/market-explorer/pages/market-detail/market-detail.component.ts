import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MarketService } from '../../services/market.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-market-detail',
  imports: [CommonModule],
  templateUrl: './market-detail.component.html',
  styleUrl: './market-detail.component.scss',
})
export class MarketDetailComponent implements OnInit {
  market: any = null;
  insights: string | null = null;
  loadingAI = false;
  errorAI = false;

  constructor(
    private http: HttpClient,
    private marketService: MarketService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.getMarket();
  }

  getMarket() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.marketService.getMarket(id).subscribe({
      next: (data) => {
        this.market = data;
        console.log('this.market', this.market);
        this.loadAIInsights();
      },
      error: () => {
        this.errorAI = true;
      },
    });
  }

  loadAIInsights() {
    if (!this.market) return;
    this.loadingAI = true;
    this.marketService.getMarketAIInsights(this.market).subscribe({
      next: (res) => {
        this.insights = res.analysis || res.text || JSON.stringify(res);
        this.loadingAI = false;
      },
      error: () => {
        this.errorAI = true;
        this.loadingAI = false;
      },
    });
  }
}
