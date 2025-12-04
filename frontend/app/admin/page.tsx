"use client";

import React, { useEffect, useState } from 'react';
import { Part, CreatePartDTO, UpdatePartDTO } from '@/src/types/part';
import { partService } from '@/src/services/partService';
import { PartsTable } from '@/components/PartsTable';
import { PartModal } from '@/components/PartModal';
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
      <div className="max-w-6xl mx-auto">
        
        {/* List Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Gerenciar Peças</h1>
          </div>

          {loading ? (
            <div className="text-center py-12 text-gray-500">Carregando...</div>
          ) : (
            <PartsTable
              items={parts}
              onEdit={openEdit}
              onDelete={handleDelete}
              onCreate={openCreate}
            />
          )}
        </div>

        {/* Modal Form */}
        <PartModal
          isOpen={isFormOpen}
          onClose={closeForm}
          editingPart={editingPart}
          onSubmit={editingPart ? handleUpdate : handleCreate}
        />

      </div>
    </div>
  );
}
