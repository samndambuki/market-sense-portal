export const environment = {
  production: false,
  api: {
    baseUrl: 'http://localhost:4000/api',
    markets: '/markets',
    // countries: '/countries',
    // strategies: '/strategies',
    users: '/auth',
    marketPlayes: '/marketPlayers',
  },
  ai: {
    baseUrl: 'http://localhost:4000/api/ai',
    marketSummary: '/ai/market-summary',
    // countryAnalysis: '/ai/country-analysis',
    // strategyEvaluation: '/ai/strategy-evaluation',
    // recommendations: '/ai/recommendations',
    competitoranalysis: '/ai/competitorAnalysis',
  },
};
