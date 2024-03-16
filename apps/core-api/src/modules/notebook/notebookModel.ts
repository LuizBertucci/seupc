import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

import { commonValidations } from '@common/utils/commonValidation';

extendZodWithOpenApi(z);

export enum Brand {
  ACER = 'Acer',
  APELL = 'Apple',
  ALIENWARE = 'Alienware',
  ASUS = 'Asus',
  AVELL = 'Avell',
  CCE = 'CCE',
  COMPAQ = 'Compaq',
  DELL = 'Dell',
  EVOO = 'EVOO',
  GIGABYTE = 'Gigabyte',
  HUAWEI = 'Huawei',
  HP = 'HP',
  IBM = 'IBM',
  ITAUTEC = 'Itautec',
  LG = 'LG',
  LENOVO = 'Lenovo',
  MSI = 'MSI',
  MULTILASER = 'Multilaser',
  NEOPC = 'NeoPC',
  PHILCO = 'Philco',
  POSITIVO = 'Positivo',
  SAMSUNG = 'Samsung',
  SEMP = 'Semp Toshiba',
  VAIO = 'Vaio',
  XIAOMI = 'Xiaomi',
}

export type Notebook = NotebookSchema;

interface NotebookSchema {
  id: string;
  title: string;
  brand: Brand;
  createdAt: Date;
  updatedAt: Date;
}

export interface NotebookRowSchema {
  id: string;
  title: string;
  brand: Brand;
  created_at: string;
  updated_at: string;
}

// Input Validation for 'GET notebook/:id' endpoint
export const GetNotebookByIdRequest = z.object({
  params: z.object({ id: commonValidations.id }),
});

export type GetNotebookByIdResponse = z.infer<typeof GetNotebookByIdResponse>;

// Response for 'GET notebook/:id' endpoint
export const GetNotebookByIdResponse = z.object({
  id: z.string(),
  title: z.string(),
  brand: z.nativeEnum(Brand),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type CreateNotebookRequest = z.infer<typeof CreateNotebookRequest>;

// Input Validation for 'POST notebook' endpoint
export const CreateNotebookRequest = z.object({
  title: z.string(),
  brand: z.nativeEnum(Brand),
});
