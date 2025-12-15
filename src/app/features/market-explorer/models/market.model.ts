export interface Market {
  id: number;
  name: string;
  category: string;
  region: string;
  growthRate: string;
  description: string;
  metrics: {
    marketSize: string;
    topLayers: string[];
    riskLevel: 'Low' | 'Medium' | 'High';
  };
}
