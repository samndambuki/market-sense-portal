export interface EnvironmentConfig {
  production: boolean;
  api: {
    baseUrl: string;
    markets: string;
    countries: string;
    strategies: string;
  };
  ai: {
    baseUrl: string;
    marketSummary: string;
    countryAnalysis: string;
    strategyEvaluation: string;
    recommendations: string;
  };
}
