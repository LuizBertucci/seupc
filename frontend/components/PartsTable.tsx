"use client";

import React, { useState } from 'react';
import { Part } from '@/src/types/part';
import { Trash2, Edit, Plus, Search } from 'lucide-react';

type Props = {
  items: Part[];
  onEdit: (part: Part) => void;
  onDelete: (id: string) => void;
  onCreate: () => void;
};

const PartsTable: React.FC<Props> = ({ items, onEdit, onDelete, onCreate }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = items.filter((part) =>
    part.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    part.part_type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm w-full lg:w-1/2">
      <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
        <h3 className="font-semibold text-gray-700">Lista de Peças</h3>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
            />
          </div>
          <button
            onClick={onCreate}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            <Plus size={18} />
            <span className="hidden sm:inline">Nova Peça</span>
          </button>
        </div>
      </div>
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700">
          <tr>
            <th className="px-6 py-3">Nome</th>
            <th className="px-6 py-3">Tipo</th>
            <th className="px-6 py-3">Pontuação</th>
            <th className="px-6 py-3 text-right">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {filteredItems.map((p) => (
            <tr key={p.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 font-medium text-gray-900">{p.name}</td>
              <td className="px-6 py-4">{p.part_type}</td>
              <td className="px-6 py-4">{p.point}</td>
              <td className="px-6 py-4 text-right">
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
    </div>
  );
};

export { PartsTable };
