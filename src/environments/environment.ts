export const environment = {
  production: false,
  api: {
    baseUrl: 'http://localhost:3000',
    markets: '/markets',
    countries: '/countries',
    strategies: '/strategies',
  },
  ai: {
    baseUrl: 'http://localhost:4000',
    marketSummary: '/ai/marketSummary',
    countryAnalysis: '/ai/country-analysis',
    strategyEvaluation: '/ai/strategy-evaluation',
    recommendations: '/ai/recommendations',
  },
};
