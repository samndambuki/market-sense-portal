export interface Market {
  id: number;
  name: string;
  category: string;
  region: string;
  description: string;
  growthRate: number;
  metrics: {
    marketSize: string;
    topPlayers: string[];
    riskLevel: 'Low' | 'Medium' | 'High';
  };
}
