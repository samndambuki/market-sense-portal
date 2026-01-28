import { Component, OnInit } from '@angular/core';
import { MarketService } from '../../services/market.service';
import { CommonModule } from '@angular/common';
import { Market } from '../../models/market.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-market-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './market-list.component.html',
  styleUrl: './market-list.component.scss',
})
export class MarketListComponent implements OnInit {
  searchTerm = '';
  selectedCategory = 'All';
  selectedRegion = 'All';
  selectedGrowth = 'All';

  filteredMarkets: Market[] = [];

  constructor(public marketService: MarketService) {}

  ngOnInit(): void {
    this.marketService.loadMarkets();
  }

  ngDoCheck(): void {
    if (
      !this.marketService.loading &&
      this.marketService.markets.length &&
      this.filteredMarkets.length === 0
    ) {
      this.filteredMarkets = this.marketService.markets;
    }
  }

  applyFilters() {
    this.filteredMarkets = this.marketService.markets.filter((market) => {
      const matchesSearch = market.name
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase());

      const matchesCategory =
        this.selectedCategory === 'All' ||
        market.category === this.selectedCategory;

      const matchesRegion =
        this.selectedRegion === 'All' || market.region === this.selectedRegion;

      const growthLevel =
        market.growthRate >= 15
          ? 'High'
          : market.growthRate >= 10
            ? 'Medium'
            : 'Low';

      const matchesGrowth =
        this.selectedGrowth === 'All' || growthLevel === this.selectedGrowth;

      return matchesSearch && matchesCategory && matchesRegion && matchesGrowth;
    });
  }
}
