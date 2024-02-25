import { z } from 'zod';

export const commonValidations = {
  id: z
    .string()
    .refine((data) => !isNaN(Number(data)), 'ID precisa ser um número válido.')
    .transform(Number)
    .refine((num) => num > 0, 'O ID precisa ser um número positivo.'),
  // ... other common validations
};
