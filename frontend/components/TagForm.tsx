"use client";

import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler, Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Trash2 } from 'lucide-react';
import { Tag } from '@/src/types/tag';
import { Part, PartType } from '@/src/types/part';
import { partService } from '@/src/services/partService';

const schema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  category: z.string().optional(),
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
  onDelete: (id: string) => void;
};

export const TagForm: React.FC<Props> = ({ isOpen, onClose, editingTag, onSubmit, onDelete }) => {
  const [parts, setParts] = useState<Part[]>([]);
  const [loadingParts, setLoadingParts] = useState(false);
  const [processorSearchTerm, setProcessorSearchTerm] = useState('');
  const [selectedProcessorName, setSelectedProcessorName] = useState('');
  const [processorResults, setProcessorResults] = useState<Part[]>([]);
  const [processorSearchLoading, setProcessorSearchLoading] = useState(false);
  const [processorSearchError, setProcessorSearchError] = useState<string | null>(null);

  const { register, handleSubmit, reset, setValue, watch, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema) as unknown as Resolver<FormData>,
    defaultValues: {
      name: '',
      category: '',
      processor_id: '',
      ram_memory_id: '',
      hd_id: '',
      ssd_id: '',
      video_card_id: '',
    }
  });

  const processorId = watch('processor_id');

  useEffect(() => {
    const fetchParts = async () => {
      try {
        setLoadingParts(true);
        const [ram, video, hd, ssd] = await Promise.all([
          partService.getByType(PartType.RAM_MEMORY),
          partService.getByType(PartType.VIDEO_CARD),
          partService.getByType(PartType.HD),
          partService.getByType(PartType.SSD),
        ]);

        setParts([...ram, ...video, ...hd, ...ssd]);
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
          category: editingTag.category || '',
          processor_id: editingTag.processor_id || '',
          ram_memory_id: editingTag.ram_memory_id || '',
          hd_id: editingTag.hd_id || '',
          ssd_id: editingTag.ssd_id || '',
          video_card_id: editingTag.video_card_id || '',
        });
      } else {
        reset({
          name: '',
          category: '',
          processor_id: '',
          ram_memory_id: '',
          hd_id: '',
          ssd_id: '',
          video_card_id: '',
        });
      }
    }
  }, [isOpen, editingTag, reset]);

  // Carrega o nome do processador selecionado (modo edição) e mantém form sincronizado
  useEffect(() => {
    const loadSelectedProcessor = async () => {
      if (!isOpen) return;

      const currentId = editingTag?.processor_id;
      if (currentId) {
        try {
          const processor = await partService.getById(currentId);
          setProcessorSearchTerm(processor.name);
          setSelectedProcessorName(processor.name);
          setValue('processor_id', currentId);
        } catch (error) {
          console.error('Error fetching processor by id:', error);
        }
      } else {
        setSelectedProcessorName('');
        setProcessorSearchTerm('');
      }
    };

    loadSelectedProcessor();
  }, [isOpen, editingTag, setValue]);

  // Busca de processadores com debounce
  useEffect(() => {
    if (!isOpen) return;

    const term = processorSearchTerm.trim();
    const selectedName = selectedProcessorName.trim();

    // Se já há processador selecionado e o usuário não alterou o texto, não busca
    if (processorId && term === selectedName) {
      setProcessorResults([]);
      setProcessorSearchError(null);
      return;
    }

    if (!term) {
      setProcessorResults([]);
      setProcessorSearchError(null);
      return;
    }

    const timeoutId = setTimeout(async () => {
      try {
        setProcessorSearchLoading(true);
        setProcessorSearchError(null);
        const results = await partService.search(PartType.PROCESSOR, term, 20);
        setProcessorResults(results);
      } catch (error) {
        console.error('Error searching processors:', error);
        setProcessorSearchError('Erro ao buscar processadores.');
        setProcessorResults([]);
      } finally {
        setProcessorSearchLoading(false);
      }
    }, 300);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [processorSearchTerm, processorId, selectedProcessorName, isOpen]);

  const handleSelectProcessor = (part: Part) => {
    setValue('processor_id', part.id);
    setProcessorSearchTerm(part.name);
    setSelectedProcessorName(part.name);
    setProcessorResults([]);
  };

  const handleClearProcessor = () => {
    setValue('processor_id', '');
    setSelectedProcessorName('');
    setProcessorSearchTerm('');
    setProcessorResults([]);
  };

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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
              <input
                {...register('category')}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Ex: Gamer, Escritório..."
              />
              {errors.category && <p className="mt-1 text-xs text-red-500">{errors.category.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Processador</label>
                <input type="hidden" {...register('processor_id')} />
                <div className="space-y-2">
                  <div className="relative">
                    <input
                      value={processorSearchTerm}
                      onChange={(e) => setProcessorSearchTerm(e.target.value)}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 pr-10 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      placeholder="Buscar processador (ex: i5-4020)"
                    />
                    {processorId && (
                      <button
                        type="button"
                        onClick={handleClearProcessor}
                        className="absolute inset-y-0 right-2 my-auto h-6 w-6 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 flex items-center justify-center"
                        aria-label="Limpar processador"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    {(processorSearchTerm.trim().length > 0 && processorSearchTerm.trim() !== selectedProcessorName.trim()) && (processorSearchLoading || processorSearchError || (processorResults.length > 0) || (processorResults.length === 0 && !processorSearchLoading && !processorSearchError)) && (
                      <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                        {processorSearchLoading && (
                          <div className="px-3 py-2 text-xs text-gray-500">Buscando...</div>
                        )}
                        {processorSearchError && (
                          <div className="px-3 py-2 text-xs text-red-500">{processorSearchError}</div>
                        )}
                        {!processorSearchLoading && !processorSearchError && processorResults.length > 0 && (
                          <ul className="divide-y">
                            {processorResults.map((p) => (
                              <li key={p.id}>
                                <button
                                  type="button"
                                  onClick={() => handleSelectProcessor(p)}
                                  className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50"
                                >
                                  {p.name}
                                </button>
                              </li>
                            ))}
                          </ul>
                        )}
                        {!processorSearchLoading && !processorSearchError && processorResults.length === 0 && processorSearchTerm.trim().length > 0 && (
                          <div className="px-3 py-2 text-xs text-gray-500">Nenhum processador encontrado.</div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
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

            <div className="flex justify-between items-center pt-4">
              {editingTag ? (
                <button
                  type="button"
                  onClick={() => onDelete(editingTag.id)}
                  className="px-4 py-2 text-sm font-medium text-red-600 bg-white border border-red-200 rounded-md hover:bg-red-50 flex items-center gap-2"
                >
                  <Trash2 size={16} />
                  Excluir
                </button>
              ) : (
                <div></div>
              )}
              <div className="flex gap-3">
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
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
