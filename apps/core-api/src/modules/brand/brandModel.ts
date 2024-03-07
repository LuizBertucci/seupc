import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

import { commonValidations } from '@common/utils/commonValidation';

extendZodWithOpenApi(z);

export type Brand = BrandSchema;

interface BrandSchema {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export const GetBrandByIdRequest = z.object({
  params: z.object({ id: commonValidations.id }),
});

export type GetBrandByIdResponse = z.infer<typeof GetBrandByIdResponse>;

export const GetBrandByIdResponse = z.object({
  id: z.string().uuid(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type CreateBrandRequest = z.infer<typeof CreateBrandRequest>;

export const CreateBrandRequest = z.object({ name: z.string() });

export type UpdateBrandRequest = z.infer<typeof CreateBrandRequest>;

export const UpdateBrandRequest = CreateBrandRequest;
