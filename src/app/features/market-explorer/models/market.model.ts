export interface MarketPlayer {
  id: number;
  companyName: string;
  marketId: number;
}

export interface Market {
  id?: number;
  name: string;
  category: string;
  region: string;
  description: string;
  growthRate: number;
  marketSize?: string;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | string;
  players: MarketPlayer[];
}
