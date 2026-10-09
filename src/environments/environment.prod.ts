export const environment = {
  production: true,
  api: {
    baseUrl: 'https://api.marketsense.com',
    markets: '/markets',
    // strategies: '/strategies',
    // countries: '/countries',
    marketPlayers: '/marketPlayers',
  },
  ai: {
    baseUrl: 'https://ai.marketsense.com',
    marketSummary: '/market-summary',
    // countryAnalysis: '/country-analysis',
    // strategyEvaluation: '/strategy-evaluation',
    // recommedations: '/recommedations',
    competitorAnalysis: '/competitorAnalysis',
  },
};
