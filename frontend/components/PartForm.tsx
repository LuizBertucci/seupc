"use client";

import React, { useEffect } from 'react';
import { useForm, SubmitHandler, Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';
import { Part, PartType } from '@/src/types/part';

const schema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  part_type: z.nativeEnum(PartType, { message: 'Selecione um tipo válido' }),
  point: z.coerce.number().positive('Pontuação deve ser maior que 0'),
});

type FormData = z.infer<typeof schema>;

type Props = {
  isOpen: boolean;
  onClose: () => void;
  editingPart: Part | null;
  onSubmit: (data: FormData) => Promise<void>;
};

export const PartForm: React.FC<Props> = ({ isOpen, onClose, editingPart, onSubmit }) => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema) as unknown as Resolver<FormData>,
    defaultValues: {
      name: '',
      point: 0,
      part_type: PartType.PROCESSOR,
    }
  });

  useEffect(() => {
    if (isOpen) {
      if (editingPart) {
        reset({
          name: editingPart.name,
          part_type: editingPart.part_type,
          point: editingPart.point,
        });
      } else {
        reset({
          name: '',
          point: 0,
          part_type: PartType.PROCESSOR,
        });
      }
    }
  }, [isOpen, editingPart, reset]);

  const onFormSubmit: SubmitHandler<FormData> = (data) => {
    return onSubmit(data);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-100 bg-opacity-90 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            {editingPart ? 'Editar Peça' : 'Nova Peça'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6">
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
                {...register('part_type')}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                {Object.values(PartType).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.part_type && <p className="mt-1 text-xs text-red-500">{errors.part_type.message}</p>}
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
                onClick={onClose}
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
        </div>
      </div>
    </div>
  );
};
