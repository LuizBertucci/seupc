import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

import { commonValidations } from '@common/utils/commonValidation';

extendZodWithOpenApi(z);

export type Notebook = z.infer<typeof NotebookSchema>;

export const NotebookSchema = z.object({
  id: z.string(),
  title: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Input Validation for 'GET notebook/:id' endpoint
export const GetNotebookByIdRequest = z.object({
  params: z.object({ id: commonValidations.id }),
});

export type GetNotebookByIdResponse = z.infer<typeof GetNotebookByIdResponse>;

// Response for 'GET notebook/:id' endpoint
export const GetNotebookByIdResponse = z.object({
  id: z.string(),
  title: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type CreateNotebookRequest = z.infer<typeof CreateNotebookRequest>;

// Input Validation for 'POST notebook' endpoint
export const CreateNotebookRequest = z.object({
  title: z.string(),
});
