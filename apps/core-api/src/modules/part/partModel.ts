import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

import { commonValidations } from '@common/utils/commonValidation';

extendZodWithOpenApi(z);

export type Part = PartSchema;

interface PartSchema {
  id: string;
  partType: string;
  point: number;
  name: string;
  multiplier: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PartRowSchema {
  id: string;
  part_type: string;
  point: number;
  name: string;
  multiplier: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export const GetPartByIdRequest = z.object({
  params: z.object({ id: commonValidations.id }),
});

export type GetPartByIdResponse = z.infer<typeof GetPartByIdResponse>;

export const GetPartByIdResponse = z.object({
  id: z.string().uuid(),
  partType: z.string(),
  point: z.number(),
  name: z.string(),
  multiplier: z.number(),
  active: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type CreatePartRequest = z.infer<typeof CreatePartRequest>;

export const CreatePartRequest = z.object({
  name: z.string(),
  partType: z.string(),
  point: z.number(),
  multiplier: z.number(),
  active: z.boolean(),
});

export type UpdatePartRequest = z.infer<typeof UpdatePartRequest>;

export const UpdatePartRequest = z.object({
  name: z.string(),
  point: z.number(),
  multiplier: z.number(),
  active: z.boolean(),
});
