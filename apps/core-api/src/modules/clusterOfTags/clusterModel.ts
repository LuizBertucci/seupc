import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

import { commonValidations } from '@common/utils/commonValidation';

extendZodWithOpenApi(z);

export type Cluster = ClusterSchema;

export enum ClusterType {
  PROFILE = 'Profile',
  UNIVERSITY = 'University',
}

interface ClusterSchema {
  id: string;
  type: ClusterType;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ClusterRowSchema {
  id: string;
  type: ClusterType;
  name: string;
  created_at: string;
  updated_at: string;
}

export const GetClusterByIdRequest = z.object({
  params: z.object({ id: commonValidations.id }),
});

export type ClusterDTO = z.infer<typeof ClusterDTO>;

export const ClusterDTO = z.object({
  id: z.string().uuid(),
  type: z.nativeEnum(ClusterType),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type CreateClusterDTO = z.infer<typeof CreateClusterDTO>;

export const CreateClusterDTO = z.object({
  name: z.string().min(1),
  type: z.nativeEnum(ClusterType),
  tagsIds: z.array(z.string().uuid()).optional(),
});

export type UpdateClusterDTO = z.infer<typeof UpdateClusterDTO>;

export const UpdateClusterDTO = z.object({
  name: z.string().min(1),
});
