"use client";

import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler, Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';
import { Tag } from '@/src/types/tag';
import { Part, PartType } from '@/src/types/part';
import { partService } from '@/src/services/partService';

const schema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  processor_id: z.string().nullable(),
  ram_memory_id: z.string().nullable(),
  hd_id: z.string().nullable(),
  ssd_id: z.string().nullable(),
  video_card_id: z.string().nullable(),
});

type FormData = z.infer<typeof schema>;

type Props = {
  isOpen: boolean;
  onClose: () => void;
  editingTag: Tag | null;
  onSubmit: (data: FormData) => Promise<void>;
};

export const TagModal: React.FC<Props> = ({ isOpen, onClose, editingTag, onSubmit }) => {
  const [parts, setParts] = useState<Part[]>([]);
  const [loadingParts, setLoadingParts] = useState(false);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema) as unknown as Resolver<FormData>,
    defaultValues: {
      name: '',
      processor_id: '',
      ram_memory_id: '',
      hd_id: '',
      ssd_id: '',
      video_card_id: '',
    }
  });

  useEffect(() => {
    const fetchParts = async () => {
      try {
        setLoadingParts(true);
        const data = await partService.getAll();
        setParts(data);
      } catch (error) {
        console.error('Error fetching parts:', error);
      } finally {
        setLoadingParts(false);
      }
    };

    if (isOpen) {
      fetchParts();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      if (editingTag) {
        reset({
          name: editingTag.name,
          processor_id: editingTag.processor_id || '',
          ram_memory_id: editingTag.ram_memory_id || '',
          hd_id: editingTag.hd_id || '',
          ssd_id: editingTag.ssd_id || '',
          video_card_id: editingTag.video_card_id || '',
        });
      } else {
        reset({
          name: '',
          processor_id: '',
          ram_memory_id: '',
          hd_id: '',
          ssd_id: '',
          video_card_id: '',
        });
      }
    }
  }, [isOpen, editingTag, reset]);

  const onFormSubmit: SubmitHandler<FormData> = (data) => {
    // Convert empty strings to null
    const processedData = {
      ...data,
      processor_id: data.processor_id || null,
      ram_memory_id: data.ram_memory_id || null,
      hd_id: data.hd_id || null,
      ssd_id: data.ssd_id || null,
      video_card_id: data.video_card_id || null,
    };
    return onSubmit(processedData);
  };

  if (!isOpen) return null;

  const getPartsByType = (type: PartType) => parts.filter(p => p.part_type === type);

  return (
    <div className="fixed inset-0 bg-gray-100 bg-opacity-90 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            {editingTag ? 'Editar Tag' : 'Nova Tag'}
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
                placeholder="Ex: Setup Gamer Básico"
              />
              {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Processador</label>
                <select
                  {...register('processor_id')}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  disabled={loadingParts}
                >
                  <option value="">Selecione...</option>
                  {getPartsByType(PartType.PROCESSOR).map((p) => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Memória RAM</label>
                <select
                  {...register('ram_memory_id')}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  disabled={loadingParts}
                >
                  <option value="">Selecione...</option>
                  {getPartsByType(PartType.RAM_MEMORY).map((p) => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Placa de Vídeo</label>
                <select
                  {...register('video_card_id')}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  disabled={loadingParts}
                >
                  <option value="">Selecione...</option>
                  {getPartsByType(PartType.VIDEO_CARD).map((p) => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">HD</label>
                <select
                  {...register('hd_id')}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  disabled={loadingParts}
                >
                  <option value="">Selecione...</option>
                  {getPartsByType(PartType.HD).map((p) => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">SSD</label>
                <select
                  {...register('ssd_id')}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  disabled={loadingParts}
                >
                  <option value="">Selecione...</option>
                  {getPartsByType(PartType.SSD).map((p) => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>
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
