import { Component, OnInit, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { Market } from '../market-explorer/models/market.model';
import { MarketService } from '../market-explorer/services/market.service';

Chart.register(...registerables);
Chart.defaults.font.family = "'Instrument Sans', system-ui, sans-serif";
Chart.defaults.color = '#5B6478';
Chart.defaults.font.size = 10.5;

const GROWTH_COLORS = { High: '#1F9D6B', Medium: '#F5A524', Low: '#94A3B8' };

const CATEGORY_COLORS = [
  '#2F5BEA',
  '#1F9D6B',
  '#F5A524',
  '#8B5CF6',
  '#E5484D',
  '#0EA5E9',
  '#64748B',
  '#D946EF',
  '#14B8A6',
];

interface CategorySlice {
  name: string;
  count: number;
  share: number;
  color: string;
}

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, BaseChartDirective, DecimalPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  private marketService = inject(MarketService);

  markets: Market[] = [];
  isLoading = true;
  hasError = false;

  categories: CategorySlice[] = [];
  topMarkets: Market[] = [];

  barChartType = 'bar' as const;
  doughnutChartType = 'doughnut' as const;

  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [],
  };
  doughnutChartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: [],
    datasets: [],
  };

  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: { label: (ctx) => ` ${ctx.parsed.x}% annual growth` },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: { color: '#EEF1F6' },
        border: { display: false },
        ticks: { callback: (value) => `${value}%` },
      },
      y: {
        grid: { display: false },
        border: { display: false },
        ticks: {
          color: '#101828',
          callback(value) {
            const label = String(this.getLabelForValue(Number(value)));
            return label.length > 20 ? `${label.slice(0, 19)}…` : label;
          },
        },
      },
    },
  };

  doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '72%',
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => ` ${ctx.parsed} market${ctx.parsed === 1 ? '' : 's'}`,
        },
      },
    },
  };

  ngOnInit(): void {
    this.loadMarkets();
  }

  loadMarkets(): void {
    this.isLoading = true;
    this.hasError = false;

    this.marketService.loadMarkets().subscribe({
      next: (data) => {
        this.markets = data;
        this.isLoading = false;
        this.updateCharts();
      },
      error: (error) => {
        console.error('Failed to load markets', error);
        this.isLoading = false;
        this.hasError = true;
      },
    });
  }

  growthTier(rate: number): 'High' | 'Medium' | 'Low' {
    return rate >= 15 ? 'High' : rate >= 10 ? 'Medium' : 'Low';
  }

  /** "HIGH" -> "High" */
  riskLabel(risk: string): string {
    return risk
      ? risk.charAt(0).toUpperCase() + risk.slice(1).toLowerCase()
      : '';
  }

  private updateCharts(): void {
    const sorted = [...this.markets].sort(
      (a, b) => b.growthRate - a.growthRate,
    );
    this.topMarkets = sorted.slice(0, 5);

    this.barChartData = {
      labels: sorted.map((m) => m.name),
      datasets: [
        {
          data: sorted.map((m) => m.growthRate),
          backgroundColor: sorted.map(
            (m) => GROWTH_COLORS[this.growthTier(m.growthRate)],
          ),
          borderRadius: 6,
          maxBarThickness: 14,
        },
      ],
    };

    const counts = this.markets.reduce<Record<string, number>>((acc, m) => {
      acc[m.category] = (acc[m.category] || 0) + 1;
      return acc;
    }, {});

    this.categories = Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .map(([name, count], i) => ({
        name,
        count,
        share: (count / this.markets.length) * 100,
        color: CATEGORY_COLORS[i % CATEGORY_COLORS.length],
      }));

    this.doughnutChartData = {
      labels: this.categories.map((c) => c.name),
      datasets: [
        {
          data: this.categories.map((c) => c.count),
          backgroundColor: this.categories.map((c) => c.color),
          borderColor: '#ffffff',
          borderWidth: 3,
          hoverOffset: 6,
        },
      ],
    };
  }

  get barChartHeight(): number {
    // ~26px per market so bars never get squashed
    return Math.max(200, this.markets.length * 26);
  }

  get totalMarkets(): number {
    return this.markets.length;
  }

  get averageGrowth(): number {
    if (!this.markets.length) return 0;
    return (
      this.markets.reduce((sum, m) => sum + m.growthRate, 0) /
      this.markets.length
    );
  }

  get fastestMarket(): Market | undefined {
    return this.topMarkets[0];
  }

  get highRiskMarkets(): number {
    return this.markets.filter((m) => m.riskLevel?.toUpperCase() === 'HIGH')
      .length;
  }

  get highRiskShare(): number {
    return this.markets.length
      ? (this.highRiskMarkets / this.markets.length) * 100
      : 0;
  }

  get totalCategories(): number {
    return this.categories.length;
  }
}
