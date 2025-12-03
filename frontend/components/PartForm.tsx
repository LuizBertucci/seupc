"use client";

import React, { useEffect } from 'react';
import { useForm, SubmitHandler, Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Part, PartType } from '@/src/types/part';

// Defina o schema primeiro
const schema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  partType: z.nativeEnum(PartType),
  point: z.coerce.number().positive('Pontuação deve ser maior que 0'),
});

// Inferir o tipo do formulário diretamente do schema
type FormData = z.infer<typeof schema>;

type Props = {
  defaultValues?: Part;
  onSubmit: (data: FormData) => Promise<void>;
  onCancel: () => void;
};

const PartForm: React.FC<Props> = ({ defaultValues, onSubmit, onCancel }) => {
  // Passar o genérico FormData para useForm para tipagem correta
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema) as unknown as Resolver<FormData>, // Cast duplo para contornar conflito de tipos
    defaultValues: {
      name: '',
      point: 0,
      partType: PartType.PROCESSOR,
    }
  });

  useEffect(() => {
    if (defaultValues) {
      reset({
        name: defaultValues.name,
        partType: defaultValues.part_type,
        point: defaultValues.point,
      });
    } else {
      reset({
         name: '',
         point: 0,
         partType: PartType.PROCESSOR,
      });
    }
  }, [defaultValues, reset]);

  // Wrapper para garantir compatibilidade de tipos e contornar issues de tipagem estrita do react-hook-form v7+
  const onFormSubmit: SubmitHandler<FormData> = (data) => {
    return onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
        <input
          {...register('name')}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          placeholder="Ex: Intel Core i9"
        />
        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
        <select
          {...register('partType')}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        >
          {Object.values(PartType).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        {errors.partType && <p className="mt-1 text-xs text-red-500">{errors.partType.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Pontuação</label>
        <input
          type="number"
          {...register('point')}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
        {errors.point && <p className="mt-1 text-xs text-red-500">{errors.point.message}</p>}
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? 'Salvando...' : 'Salvar'}
        </button>
      </div>
    </form>
  );
};

export { PartForm };
