import { environment } from '../../../environments/environment';

export const API_ENDPOINTS = {
  //api
  markets: `${environment.api.baseUrl}${environment.api.markets}`,
  countries: `${environment.api.baseUrl}${environment.api.countries}`,
  strategies: `${environment.api.baseUrl}${environment.api.strategies}`,
  //ai
  marketSummary: `${environment.ai.baseUrl}${environment.ai.marketSummary}`,
  countryAnalysis: `${environment.ai.baseUrl}${environment.ai.countryAnalysis}`,
  strategyEvaluation: `${environment.ai.baseUrl}${environment.ai.strategyEvaluation}`,
  recommendations: `${environment.ai.baseUrl}${environment.ai.recommendations}`,
};
