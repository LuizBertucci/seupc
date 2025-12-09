"use client";

import React, { useEffect, useState } from 'react';
import { Tag } from '@/src/types/tag';
import { tagService } from '@/src/services/tagService';
import { Plus, Search, ChevronLeft, ChevronRight } from 'lucide-react';

type Props = {
  onEdit: (tag: Tag) => void;
  onCreate: () => void;
  refreshKey?: number;
};

const TagsTable: React.FC<Props> = ({ onEdit, onCreate, refreshKey }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorSearch, setErrorSearch] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState<number>(0);
  const itemsPerPage = 10;

  const totalPages = Math.max(1, Math.ceil(totalCount / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const hasItems = totalCount > 0;
  const from = hasItems ? startIndex + 1 : 0;
  const to = hasItems ? Math.min(startIndex + itemsPerPage, totalCount) : 0;
  const emptyMessage = errorSearch
    ? errorSearch
    : loading
      ? 'Buscando...'
      : searchTerm
        ? 'Nenhuma tag encontrada para a busca.'
        : 'Nenhuma tag cadastrada.';

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  useEffect(() => {
    const term = searchTerm.trim();
    let cancelled = false;

    const timeoutId = setTimeout(async () => {
      try {
        setLoading(true);
        setErrorSearch(null);
        const { items: data, total } = await tagService.list({
          page: currentPage,
          pageSize: itemsPerPage,
          q: term || undefined,
        });
        if (!cancelled) {
          setItems(data);
          setTotalCount(total ?? data.length);
        }
      } catch {
        if (!cancelled) {
          setErrorSearch('Erro ao buscar tags.');
          setItems([]);
          setTotalCount(0);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }, 300);

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [currentPage, searchTerm, itemsPerPage, refreshKey]);

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm w-full max-w-4xl mx-auto">
      <div className="p-3 bg-white border-b border-gray-200">
        <div className="grid grid-cols-3 items-center gap-3">
          <h3 className="font-semibold text-gray-900 text-lg col-span-1">Gerenciar Tags</h3>
          <div className="col-span-1 flex justify-center">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
              <input
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={handleSearch}
                className="pl-7 pr-2 py-1 border border-gray-200 rounded-md text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 w-40 sm:w-56"
              />
            </div>
          </div>
          <div className="col-span-1 flex justify-end">
            <button
              onClick={onCreate}
              className="flex items-center gap-2 bg-black text-white px-3 py-1.5 rounded-md hover:bg-gray-900 transition-colors text-sm font-medium shadow-sm"
            >
              <Plus size={14} />
              <span>Adicionar</span>
            </button>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700">
            <tr className="border-b border-gray-200">
              <th className="px-2 py-2 text-xs text-left w-[30%]">Nome</th>
              <th className="px-2 py-2 text-xs text-left w-[12%]">Categoria</th>
              <th className="px-2 py-2 text-xs text-left w-[21%]">CPU</th>
              <th className="px-2 py-2 text-xs text-left w-[18%]">RAM</th>
              <th className="px-2 py-2 text-xs text-left w-[19%]">GPU</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {items.map((tag) => (
              <tr 
                key={tag.id} 
                className="hover:bg-gray-50 border-b border-gray-100 last:border-0 cursor-pointer"
                onClick={() => onEdit(tag)}
              >
                <td className="px-2 py-2 text-xs font-medium text-gray-900 truncate max-w-[200px]">{tag.name}</td>
                <td className="px-2 py-2 text-xs truncate max-w-[80px]">{tag.category || '-'}</td>
                <td className="px-2 py-2 text-xs truncate max-w-[200px]">
                  {tag.processor
                    ? `${tag.processor.name}${tag.processor.point ? ` (${tag.processor.point})` : ''}`
                    : '-'}
                </td>
                <td className="px-2 py-2 text-xs truncate max-w-[140px]">{tag.ram_memory?.name || '-'}</td>
                <td className="px-2 py-2 text-xs truncate max-w-[140px]">{tag.video_card?.name || '-'}</td>
              </tr>
            ))}
          {items.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {totalPages > 1 && (
        <div className="flex items-center justify-between p-4 border-t border-gray-200 bg-white">
          <div className="text-sm text-gray-500">
            Mostrando {from} a {to} de {totalCount} tags
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed text-gray-600"
              title="Página anterior"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="flex items-center px-2 text-sm font-medium text-gray-700">
              Página {currentPage} de {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed text-gray-600"
              title="Próxima página"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export { TagsTable };
