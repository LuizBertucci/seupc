import { api } from './config';

export enum ORWName {
  ZOOM = 'Zoom',
  BUSCAPE = 'BuscaPé',
  TEC_MUNDO = 'TecMundo',
  JA_COTEI = 'JáCotei',
  BONDFARO = 'Bondfaro',
  CLIQUE_E_CONOMIZE = 'Clique Economize',
  PROMOBIT = 'Promobit',
  GOOGLE_SHOPPING = 'Google Shopping',
}

interface IAddOtherRecommendationWebsiteResponse {
  success: boolean;
  message: string;
  statusCode: number;
}

interface IAddOtherRecommendationWebsiteParams {
  name: ORWName;
  link: string;
  notebookId: string;
}

export const addOtherRecommendationWebsite = async (params: IAddOtherRecommendationWebsiteParams) =>
  api.post<IAddOtherRecommendationWebsiteResponse>('/others-recommendations-websites', params);
