import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

import { commonValidations } from '@common/utils/commonValidation';

extendZodWithOpenApi(z);

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

export type OtherRecommendationWebsite = OtherRecommendationWebsiteSchema;

interface OtherRecommendationWebsiteSchema {
  id: string;
  notebookId: string;
  name: ORWName;
  link: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OtherRecommendationWebsiteRowSchema {
  id: string;
  notebook_id: string;
  name: ORWName;
  link: string;
  created_at: string;
  updated_at: string;
}

export const GetOtherRecommendationWebsiteByIdRequest = z.object({
  params: z.object({ id: commonValidations.id }),
});

export type GetOtherRecommendationWebsiteByIdResponse = z.infer<typeof GetOtherRecommendationWebsiteByIdResponse>;

export const GetOtherRecommendationWebsiteByIdResponse = z.object({
  id: z.string().uuid(),
  link: z.string(),
  name: z.nativeEnum(ORWName),
  notebookId: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type CreateOtherRecommendationWebsiteRequest = z.infer<typeof CreateOtherRecommendationWebsiteRequest>;

export const CreateOtherRecommendationWebsiteRequest = z.object({
  name: z.nativeEnum(ORWName),
  link: z.string(),
  notebookId: z.string().uuid(),
});

export type UpdateOtherRecommendationWebsiteRequest = z.infer<typeof UpdateOtherRecommendationWebsiteRequest>;

export const UpdateOtherRecommendationWebsiteRequest = z.object({
  name: z.nativeEnum(ORWName),
  link: z.string(),
});
