import { Component, OnInit } from '@angular/core';
import { MarketService } from '../../services/market.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-market-list',
  imports: [CommonModule],
  templateUrl: './market-list.component.html',
  styleUrl: './market-list.component.scss',
})
export class MarketListComponent implements OnInit {
  constructor(public marketService: MarketService) {}
  ngOnInit(): void {
    this.marketService.loadMarkets();
  }
}
