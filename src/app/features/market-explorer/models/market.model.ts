export interface Market {
  id?: number;
  name: string;
  category: string;
  region: string;
  description: string;
  growthRate: number;
  riskLevel: string;
  players: string[];
}
