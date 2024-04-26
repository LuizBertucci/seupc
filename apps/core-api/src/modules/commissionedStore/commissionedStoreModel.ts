import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

import { commonValidations } from '@common/utils/commonValidation';

extendZodWithOpenApi(z);

export type CommissionedStore = CommissionedStoreSchema;

export enum CommissionedStoreName {
  MAGALU = 'Magalu',
  AMAZON = 'Amazon',
}

interface CommissionedStoreSchema {
  id: string;
  commissionedCompany: CommissionedStoreName;
  notebookId: string;
  productUrl: string;
  commissionedUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CommissionedStoreRowSchema {
  id: string;
  commissioned_company: CommissionedStoreName;
  notebook_id: string;
  product_url: string;
  commissioned_url: string;
  created_at: Date;
  updated_at: Date;
}

export const GetCommissionedStoreByIdRequest = z.object({
  params: z.object({ id: commonValidations.id }),
});

export type GetCommissionedStoreByIdResponse = z.infer<typeof GetCommissionedStoreByIdResponse>;

export const GetCommissionedStoreByIdResponse = z.object({
  id: z.string().uuid(),
  commissionedCompany: z.nativeEnum(CommissionedStoreName),
  notebookId: z.string().uuid(),
  productUrl: z.string(),
  commissionedUrl: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type CreateCommissionedStoreRequest = z.infer<typeof CreateCommissionedStoreRequest>;

export const CreateCommissionedStoreRequest = z.object({
  commissionedCompany: z.nativeEnum(CommissionedStoreName),
  notebookId: z.string().uuid(),
  productUrl: z.string(),
  commissionedUrl: z.string(),
});

export type UpdateCommissionedStoreRequest = z.infer<typeof UpdateCommissionedStoreRequest>;

export const UpdateCommissionedStoreRequest = z.object({
  productUrl: z.string(),
  commissionedUrl: z.string(),
});
