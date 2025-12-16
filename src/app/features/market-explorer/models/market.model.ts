export interface Market {
  id: number;
  name: string;
  category: string;
  region:string;
  description: string;
  growthRate: string;
  metrics: {
    marketSize: string;
    topLayers: string[];
    riskLevel: 'Low' | 'Medium' | 'High';
  };
}
