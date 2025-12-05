"use client";

import React, { useState } from 'react';
import { Part } from '@/src/types/part';
import { Trash2, Edit, Plus, Search, ChevronLeft, ChevronRight } from 'lucide-react';

type Props = {
  items: Part[];
  onEdit: (part: Part) => void;
  onDelete: (id: string) => void;
  onCreate: () => void;
};

const PartsTable: React.FC<Props> = ({ items, onEdit, onDelete, onCreate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredItems = items.filter((part) =>
    part.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    part.part_type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm w-full max-w-2xl mx-auto">
      <div className="p-3 bg-white border-b border-gray-200">
        <div className="grid grid-cols-3 items-center gap-3">
          <h3 className="font-semibold text-gray-900 text-lg col-span-1">Gerenciar Peças</h3>
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
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700">
          <tr>
            <th className="px-2 py-2 text-xs w-[40%]">Nome</th>
            <th className="px-2 py-2 text-xs w-[30%]">Tipo</th>
            <th className="px-2 py-2 text-xs w-[15%] text-center">Pontos</th>
            <th className="px-2 py-2 text-xs w-[15%] text-right">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {currentItems.map((p) => (
            <tr key={p.id} className="hover:bg-gray-50">
              <td className="px-2 py-2 text-xs font-medium text-gray-900 truncate max-w-[120px]">{p.name}</td>
              <td className="px-2 py-2 text-xs truncate max-w-[80px]">{p.part_type}</td>
              <td className="px-2 py-2 text-xs text-center">{p.point}</td>
              <td className="px-2 py-2 text-xs text-right">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => onEdit(p)}
                    className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50 transition-colors"
                    title="Editar"
                    aria-label="Editar"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => onDelete(p.id)}
                    className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors"
                    title="Excluir"
                    aria-label="Excluir"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {filteredItems.length === 0 && (
            <tr>
              <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                {searchTerm ? 'Nenhuma peça encontrada para a busca.' : 'Nenhuma peça cadastrada.'}
              </td>
            </tr>
          )}
        </tbody>
      </table>
      
      {totalPages > 1 && (
        <div className="flex items-center justify-between p-4 border-t border-gray-200 bg-white">
          <div className="text-sm text-gray-500">
            Mostrando {startIndex + 1} a {Math.min(startIndex + itemsPerPage, filteredItems.length)} de {filteredItems.length} peças
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

export { PartsTable };
