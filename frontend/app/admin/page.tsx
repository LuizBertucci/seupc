"use client";

import React, { useEffect, useState } from 'react';
import { Part, CreatePartDTO, UpdatePartDTO } from '@/src/types/part';
import { partService } from '@/src/services/partService';
import { PartsTable } from '@/components/PartsTable';
import { PartForm } from '@/components/PartForm';
import { Plus } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

export default function AdminPage() {
  const [parts, setParts] = useState<Part[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPart, setEditingPart] = useState<Part | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const fetchParts = async () => {
    try {
      setLoading(true);
      const data = await partService.getAll();
      setParts(data);
    } catch (error) {
      console.error(error);
      toast.error('Erro ao carregar peças');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParts();
  }, []);

  const handleCreate = async (data: CreatePartDTO) => {
    try {
      await partService.create(data);
      toast.success('Peça criada com sucesso!');
      setIsFormOpen(false);
      fetchParts();
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Erro ao criar peça';
      toast.error(msg);
    }
  };

  const handleUpdate = async (data: UpdatePartDTO) => {
    if (!editingPart) return;
    try {
      await partService.update(editingPart.id, data);
      toast.success('Peça atualizada com sucesso!');
      setEditingPart(null);
      setIsFormOpen(false);
      fetchParts();
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Erro ao atualizar peça';
      toast.error(msg);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta peça?')) return;
    try {
      await partService.delete(id);
      toast.success('Peça excluída');
      fetchParts();
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Erro ao excluir peça';
      toast.error(msg);
    }
  };

  const openCreate = () => {
    setEditingPart(null);
    setIsFormOpen(true);
  };

  const openEdit = (part: Part) => {
    setEditingPart(part);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setEditingPart(null);
    setIsFormOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Toaster position="top-right" />
      <div className="max-w-6xl mx-auto grid gap-8 lg:grid-cols-3">
        
        {/* Left Column: List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Gerenciar Peças</h1>
            <button
              onClick={openCreate}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              <Plus size={18} />
              Nova Peça
            </button>
          </div>

          {loading ? (
            <div className="text-center py-12 text-gray-500">Carregando...</div>
          ) : (
            <PartsTable
              items={parts}
              onEdit={openEdit}
              onDelete={handleDelete}
            />
          )}
        </div>

        {/* Right Column: Form (Sticky) */}
        <div className="lg:col-span-1">
          {isFormOpen ? (
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-8">
              <h2 className="text-lg font-semibold mb-4">
                {editingPart ? 'Editar Peça' : 'Nova Peça'}
              </h2>
              <PartForm
                defaultValues={editingPart || undefined}
                onSubmit={editingPart ? handleUpdate : handleCreate}
                onCancel={closeForm}
              />
            </div>
          ) : (
            <div className="bg-white p-8 rounded-lg shadow-sm text-center text-gray-500 border border-dashed border-gray-300 h-64 flex flex-col items-center justify-center">
              <p>Selecione uma peça para editar ou crie uma nova.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
