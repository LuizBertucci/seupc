"use client";

import React from 'react';
import { Part } from '@/src/types/part';
import { Trash2, Edit } from 'lucide-react';

type Props = {
  items: Part[];
  onEdit: (part: Part) => void;
  onDelete: (id: string) => void;
};

const PartsTable: React.FC<Props> = ({ items, onEdit, onDelete }) => {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
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
          {items.map((p) => (
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
          {items.length === 0 && (
            <tr>
              <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                Nenhuma peça cadastrada.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export { PartsTable };
