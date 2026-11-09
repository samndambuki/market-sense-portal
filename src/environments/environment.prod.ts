export const environment = {
  production: true,
  api: {
    baseUrl: 'https://txct1dng142t9m4k.7jc.lambda-web.us-east-2.on.aws/api',
    markets: '/markets',
    marketPlayers: '/marketPlayers',
    users: '/auth',
  },
  ai: {
    baseUrl: 'https://txct1dng142t9m4k.7jc.lambda-web.us-east-2.on.aws/api/ai',
    marketSummary: '/market-summary',
    competitorAnalysis: '/competitor-analysis',
  },
};
