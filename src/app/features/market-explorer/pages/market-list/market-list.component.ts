import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Market } from '../../models/market.model';
import { MarketService } from '../../services/market.service';

type GrowthLevel = 'High' | 'Medium' | 'Low';
type SortKey = 'growth' | 'name';

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

  /** Default: fastest-growing first */
  sortKey: SortKey = 'growth';
  sortAsc = false;

  /** Filter options come from the data, so they always match real markets */
  categories: string[] = [];
  regions: string[] = [];

  /** Growth bars are drawn relative to this (at least 25%) */
  growthScale = 25;

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
        this.growthScale = Math.max(25, ...data.map((m) => m.growthRate));
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

    const filtered = this.markets.filter((market) => {
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

    const dir = this.sortAsc ? 1 : -1;
    this.filteredMarkets = filtered.sort((a, b) =>
      this.sortKey === 'name'
        ? a.name.localeCompare(b.name) * dir
        : (a.growthRate - b.growthRate) * dir,
    );
  }

  /** Click a column header: sort by it, or flip direction if it's already active */
  sortBy(key: SortKey): void {
    if (this.sortKey === key) {
      this.sortAsc = !this.sortAsc;
    } else {
      this.sortKey = key;
      this.sortAsc = key === 'name'; // names A–Z, growth highest first
    }
    this.applyFilters();
  }

  ariaSort(key: SortKey): 'ascending' | 'descending' | 'none' {
    if (this.sortKey !== key) return 'none';
    return this.sortAsc ? 'ascending' : 'descending';
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

  growthWidth(rate: number): number {
    return Math.max(4, Math.min(100, (rate / this.growthScale) * 100));
  }

  /** "HIGH" -> "High" */
  riskLabel(risk: string): string {
    return risk
      ? risk.charAt(0).toUpperCase() + risk.slice(1).toLowerCase()
      : '';
  }
}
