import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

import { commonValidations } from '@common/utils/commonValidation';

extendZodWithOpenApi(z);

export type CommisionedStore = CommissionedStoreSchema;

export enum CommissionedStoreName {
  PROCESSOR = 'Processor',
  RAM_MEMORY = 'Ram Memory',
  HD = 'HD',
  SSD = 'SSD',
  VIDEO_CARD = 'Video Card',
}

interface CommissionedStoreSchema {
  id: string;
  commissionedCompany: CommissionedStoreName;
  notebookId: string;
  productUrl: string;
  commissionedUrl: string
  createdAt: Date;
  updatedAt: Date;
}

export interface CommissionedStoreRowSchema {
  id: string;
  commissioned_company: CommissionedStoreName;
  notebook_id: string;
  product_url: string;
  commissioned_url: string
  created_at: Date;
  updated_at: Date;
}

export const GetCommissionedStoreByIdRequest = z.object({
  params: z.object({ id: commonValidations.id }),
});

export type GetCommissionedStoreByIdResponse = z.infer<typeof GetCommissionedStoreByIdResponse>;

export const GetCommissionedStoreByIdResponse = z.object({
  id: z.string().uuid(),
  partType: z.nativeEnum(CommissionedStoreName),
  point: z.number(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type CreateCommissionedStoreRequest = z.infer<typeof CreateCommissionedStoreRequest>;

export const CreateCommissionedStoreRequest = z.object({
  name: z.string(),
  partType: z.nativeEnum(CommissionedStoreName),
  point: z.number().gt(0),
});

export type UpdateCommissionedStoreRequest = z.infer<typeof UpdateCommissionedStoreRequest>;

export const UpdateCommissionedStoreRequest = z.object({
  name: z.string(),
  point: z.number().gt(0),
});
