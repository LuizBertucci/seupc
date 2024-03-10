import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

import { commonValidations } from '@common/utils/commonValidation';

extendZodWithOpenApi(z);

export type OtherRecommendationWebsite = OtherRecommendationWebsiteSchema;

interface OtherRecommendationWebsiteSchema {
  id: string;
  notebookId: string;
  name: string;
  link: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OtherRecommendationWebsiteRowSchema {
  id: string;
  notebook_id: string;
  name: string;
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
  link: z.number(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type CreateOtherRecommendationWebsiteRequest = z.infer<typeof CreateOtherRecommendationWebsiteRequest>;

export const CreateOtherRecommendationWebsiteRequest = z.object({
  name: z.string(),
  link: z.string(),
  notebookId: z.string().uuid(),
});

export type UpdateOtherRecommendationWebsiteRequest = z.infer<typeof UpdateOtherRecommendationWebsiteRequest>;

export const UpdateOtherRecommendationWebsiteRequest = z.object({
  name: z.string(),
  link: z.string(),
});
