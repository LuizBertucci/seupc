import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

import { commonValidations } from '@common/utils/commonValidation';

extendZodWithOpenApi(z);

export type Part = PartSchema;

export enum PartType {
  CPU = 'CPU',
  MEMORY = 'MEMORY',
  HD = 'HD',
  SSD = 'SSD',
  GPU = 'GPU'
}

interface PartSchema {
  id: string;
  partType: PartType;
  point: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PartRowSchema {
  id: string;
  part_type: PartType;
  point: number;
  name: string;
  created_at: string;
  updated_at: string;
}



export const GetPartByIdRequest = z.object({
  params: z.object({ id: commonValidations.id }),
});

export type GetPartByIdResponse = z.infer<typeof GetPartByIdResponse>;

export const GetPartByIdResponse = z.object({
  id: z.string().uuid(),
  partType: z.nativeEnum(PartType),
  point: z.number(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type CreatePartRequest = z.infer<typeof CreatePartRequest>;

export const CreatePartRequest = z.object({
  name: z.string(),
  partType: z.nativeEnum(PartType),
  point: z.number().min(0),
});

export type UpdatePartRequest = z.infer<typeof UpdatePartRequest>;

export const UpdatePartRequest = z.object({
  name: z.string(),
  point: z.number().min(0),
});
