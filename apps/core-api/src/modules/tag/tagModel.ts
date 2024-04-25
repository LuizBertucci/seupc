import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

import { commonValidations } from '@common/utils/commonValidation';

extendZodWithOpenApi(z);

export type Tag = TagSchema;

export enum TagCategory {
  GAMES = 'Games',
  PROGRAMS = 'Programs',
  COURSES = 'Courses',
}

interface TagSchema {
  id: string;
  category: TagCategory;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TagRowSchema {
  id: string;
  category: TagCategory;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface TagPartTuple {
  partId: string;
  tagId: string;
}

export const GetTagByIdRequest = z.object({
  params: z.object({ id: commonValidations.id }),
});

export type GetTagByIdResponse = z.infer<typeof GetTagByIdResponse>;

export const GetTagByIdResponse = z.object({
  id: z.string().uuid(),
  category: z.nativeEnum(TagCategory),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type CreateTagRequest = z.infer<typeof CreateTagRequest>;

export const CreateTagRequest = z.object({
  name: z.string().min(1),
  category: z.nativeEnum(TagCategory),
});

export type UpdateTagRequest = z.infer<typeof UpdateTagRequest>;

export const UpdateTagRequest = z.object({
  name: z.string().min(1),
});

export type AddPartsOnTagsRequest = z.infer<typeof AddPartsOnTagsRequest>;

export const AddPartsOnTagsRequest = z.array(z.object({ partId: z.string().uuid(), tagId: z.string().uuid() }));
