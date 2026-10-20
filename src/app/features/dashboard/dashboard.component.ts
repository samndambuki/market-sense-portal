import { Component, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
import { RouterLink } from '@angular/router';
import { Market } from '../market-explorer/models/market.model';
import { MarketService } from '../market-explorer/services/market.service';
import { CommonModule } from '@angular/common';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, BaseChartDirective, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  barChartType = 'bar' as const;
  doughnutChartType = 'doughnut' as const;

  barChartData = {
    labels: ['Healthcare', 'Technology', 'Finance', 'Agriculture'],
    datasets: [
      {
        label: 'Market Growth Rate (%)',
        data: [12.5, 18.2, 8.4, 6.7],
        backgroundColor: '#2563eb',
        borderRadius: 6,
      },
    ],
  };

  doughnutChartData = {
    labels: [] as string[],
    datasets: [
      {
        data: [] as number[],
        backgroundColor: [
          '#2563eb',
          '#16a34a',
          '#f59e0b',
          '#9333ea',
          '#dc2626',
        ],
      },
    ],
  };

  barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Growth Rate (%)',
        },
      },
    },
  };

  doughnutChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
      },
    },
  };

  markets: Market[] = [];
  constructor(private marketService: MarketService) {}
  ngOnInit(): void {
    this.marketService.loadMarkets().subscribe({
      next: (data) => {
        this.markets = data;
        this.updateChart();
      },
      error: (error) => {
        console.error('Failed to load markets', error);
      },
    });
  }

  updateChart(): void {
    this.barChartData = {
      labels: this.markets.map((market) => market.name),
      datasets: [
        {
          label: 'Market Growth Rate (%)',
          data: this.markets.map((market) => market.growthRate),
          backgroundColor: '#2563eb',
          borderRadius: 6,
        },
      ],
    };

    const categoryCounts = this.markets.reduce(
      (counts, market) => {
        counts[market.category] = (counts[market.category] || 0) + 1;
        return counts;
      },
      {} as Record<string, number>,
    );

    this.doughnutChartData = {
      labels: Object.keys(categoryCounts),
      datasets: [
        {
          ...this.doughnutChartData.datasets[0],
          data: Object.values(categoryCounts),
        },
      ],
    };
  }

  get totalMarkets(): number {
    return this.markets.length;
  }

  get averageGrowth(): number {
    if (this.markets.length === 0) return 0;
    const total = this.markets.reduce(
      (sum, market) => sum + market.growthRate,
      0,
    );
    return total / this.markets.length;
  }

  get highRiskMarkets(): number {
    return this.markets.filter(
      (market) => market.riskLevel.toUpperCase() === 'HIGH',
    ).length;
  }

  get totalCategories(): number {
    return new Set(this.markets.map((market) => market.category)).size;
  }
}
