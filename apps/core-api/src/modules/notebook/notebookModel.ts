import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

import { commonValidations } from '@common/utils/commonValidation';

extendZodWithOpenApi(z);

export enum Brand {
  ACER = 'Acer',
  APPLE = 'Apple',
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
  name: string;
  brand: Brand;
  color?: string;
  screen_size?: string;
  screen_resolution?: string;
  battery?: string;
  has_numeric_keypad?: boolean;
  has_stock: boolean;
  published: boolean;
  operating_system?: string;
  manufacturer_id?: string;
  weight?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface NotebookRowSchema {
  id: string;
  name: string;
  brand: Brand;
  color?: string;
  screen_size?: string;
  screen_resolution?: string;
  battery?: string;
  has_numeric_keypad?: boolean;
  has_stock: boolean;
  published: boolean;
  operating_system?: string;
  manufacturer_id?: string;
  weight?: string;
  created_at: string;
  updated_at: string;
}

export interface NotebookPartTuple {
  partId: string;
  notebookId: string;
}

// Input Validation for 'GET notebook/:id' endpoint
export const GetNotebookByIdRequest = z.object({
  params: z.object({ id: commonValidations.id }),
});

export type GetNotebookByIdResponse = z.infer<typeof GetNotebookByIdResponse>;

// Response for 'GET notebook/:id' endpoint
export const GetNotebookByIdResponse = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  brand: z.nativeEnum(Brand),
  color: z.string().optional(),
  screen_size: z.string().optional(),
  screen_resolution: z.string().optional(),
  battery: z.string().optional(),
  has_numeric_keypad: z.boolean().optional(),
  has_stock: z.boolean().optional(),
  published: z.boolean().optional(),
  operating_system: z.string().optional(),
  manufacturer_id: z.string().optional(),
  weight: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type CreateNotebookRequest = z.infer<typeof CreateNotebookRequest>;

// Input Validation for 'POST notebook' endpoint
export const CreateNotebookRequest = z.object({
  name: z.string().min(1),
  brand: z.nativeEnum(Brand),
  color: z.string().optional(),
  screen_size: z.string().optional(),
  screen_resolution: z.string().optional(),
  battery: z.string().optional(),
  has_numeric_keypad: z.boolean().optional(),
  has_stock: z.boolean().optional(),
  published: z.boolean().optional(),
  operating_system: z.string().optional(),
  manufacturer_id: z.string().optional(),
  weight: z.string().optional(),
});

export type AddPartsOnNotebooksRequest = z.infer<typeof AddPartsOnNotebooksRequest>;

export const AddPartsOnNotebooksRequest = z.array(
  z.object({ partId: z.string().uuid(), notebookId: z.string().uuid() })
);
