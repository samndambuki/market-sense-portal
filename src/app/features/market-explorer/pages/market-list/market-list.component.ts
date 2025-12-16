import { Component, OnInit } from '@angular/core';
import { MarketService } from '../../services/market.service';

@Component({
  selector: 'app-market-list',
  imports: [],
  templateUrl: './market-list.component.html',
  styleUrl: './market-list.component.scss',
})
export class MarketListComponent implements OnInit {
  constructor(private marketService: MarketService) {}
  ngOnInit(): void {
    this.marketService.loadMarkets();
  }
}
