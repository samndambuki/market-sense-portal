import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { API_ENDPOINTS } from '../../../../core/config/api-endpoints';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-competitor-analysis',
  imports: [CommonModule, FormsModule],
  templateUrl: './competitor-analysis.component.html',
  styleUrl: './competitor-analysis.component.scss',
})
export class CompetitorAnalysisComponent {
  market: string = '';
  analysis: string = '';
  loading: boolean = false;

  constructor(private http: HttpClient) {}

  analyze() {
    this.loading = true;
    this.http
      .post<any>(API_ENDPOINTS.competitoranalysis, {
        market: this.market,
      })
      .subscribe((res) => {
        this.analysis = res.analysis;
        this.loading = false;
        this.market = '';
      });
  }
}
