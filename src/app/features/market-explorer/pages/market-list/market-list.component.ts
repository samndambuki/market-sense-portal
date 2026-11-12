import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Market } from '../../models/market.model';
import { MarketService } from '../../services/market.service';

type GrowthLevel = 'High' | 'Medium' | 'Low';

@Component({
  selector: 'app-market-list',
  imports: [FormsModule, RouterLink],
  templateUrl: './market-list.component.html',
  styleUrl: './market-list.component.scss',
})
export class MarketListComponent implements OnInit {
  private marketService = inject(MarketService);

  markets: Market[] = [];
  filteredMarkets: Market[] = [];
  isLoading = true;
  hasError = false;

  searchTerm = '';
  selectedCategory = 'All';
  selectedRegion = 'All';
  selectedGrowth = 'All';

  /** Filter options come from the data, so they always match real markets */
  categories: string[] = [];
  regions: string[] = [];

  ngOnInit(): void {
    this.loadMarkets();
  }

  loadMarkets(): void {
    this.isLoading = true;
    this.hasError = false;

    this.marketService.loadMarkets().subscribe({
      next: (data) => {
        this.markets = data;
        this.categories = [...new Set(data.map((m) => m.category))].sort();
        this.regions = [...new Set(data.map((m) => m.region))].sort();
        this.isLoading = false;
        this.applyFilters();
      },
      error: (error) => {
        console.error('Error loading markets', error);
        this.isLoading = false;
        this.hasError = true;
      },
    });
  }

  applyFilters(): void {
    const term = this.searchTerm.trim().toLowerCase();

    this.filteredMarkets = this.markets.filter((market) => {
      const matchesSearch =
        !term ||
        market.name.toLowerCase().includes(term) ||
        market.category.toLowerCase().includes(term) ||
        market.region.toLowerCase().includes(term);

      const matchesCategory =
        this.selectedCategory === 'All' ||
        market.category === this.selectedCategory;
      const matchesRegion =
        this.selectedRegion === 'All' || market.region === this.selectedRegion;
      const matchesGrowth =
        this.selectedGrowth === 'All' ||
        this.growthLevel(market.growthRate) === this.selectedGrowth;

      return matchesSearch && matchesCategory && matchesRegion && matchesGrowth;
    });
  }

  get hasActiveFilters(): boolean {
    return (
      !!this.searchTerm.trim() ||
      this.selectedCategory !== 'All' ||
      this.selectedRegion !== 'All' ||
      this.selectedGrowth !== 'All'
    );
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedCategory = 'All';
    this.selectedRegion = 'All';
    this.selectedGrowth = 'All';
    this.applyFilters();
  }

  growthLevel(rate: number): GrowthLevel {
    return rate >= 15 ? 'High' : rate >= 10 ? 'Medium' : 'Low';
  }

  /** "HIGH" -> "High" */
  riskLabel(risk: string): string {
    return risk
      ? risk.charAt(0).toUpperCase() + risk.slice(1).toLowerCase()
      : '';
  }
}
