"use client";

import React, { useEffect, useState } from 'react';
import { Part, CreatePartDTO, UpdatePartDTO } from '@/src/types/part';
import { Tag, CreateTagDTO, UpdateTagDTO } from '@/src/types/tag';
import { partService } from '@/src/services/partService';
import { tagService } from '@/src/services/tagService';
import { PartsTable } from '@/components/PartsTable';
import { PartForm } from '@/components/PartForm';
import { TagsTable } from '@/components/TagsTable';
import { TagForm } from '@/components/TagForm';
import toast, { Toaster } from 'react-hot-toast';

export default function AdminPage() {
  // Parts State
  const [parts, setParts] = useState<Part[]>([]);
  const [loadingParts, setLoadingParts] = useState(true);
  const [editingPart, setEditingPart] = useState<Part | null>(null);
  const [isPartFormOpen, setIsPartFormOpen] = useState(false);

  // Tags State
  const [tags, setTags] = useState<Tag[]>([]);
  const [loadingTags, setLoadingTags] = useState(true);
  const [editingTag, setEditingTag] = useState<Tag | null>(null);
  const [isTagFormOpen, setIsTagFormOpen] = useState(false);

  const fetchParts = async () => {
    try {
      setLoadingParts(true);
      const data = await partService.getAll();
      setParts(data);
    } catch (error) {
      console.error(error);
      toast.error('Erro ao carregar peças');
    } finally {
      setLoadingParts(false);
    }
  };

  const fetchTags = async () => {
    try {
      setLoadingTags(true);
      const data = await tagService.getAll();
      setTags(data);
    } catch (error) {
      console.error(error);
      toast.error('Erro ao carregar tags');
    } finally {
      setLoadingTags(false);
    }
  };

  useEffect(() => {
    fetchParts();
    fetchTags();
  }, []);

  // Parts Handlers
  const handleCreatePart = async (data: CreatePartDTO) => {
    try {
      await partService.create(data);
      toast.success('Peça criada com sucesso!');
      setIsPartFormOpen(false);
      fetchParts();
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Erro ao criar peça';
      toast.error(msg);
    }
  };

  const handleUpdatePart = async (data: UpdatePartDTO) => {
    if (!editingPart) return;
    try {
      await partService.update(editingPart.id, data);
      toast.success('Peça atualizada com sucesso!');
      setEditingPart(null);
      setIsPartFormOpen(false);
      fetchParts();
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Erro ao atualizar peça';
      toast.error(msg);
    }
  };

  const handleDeletePart = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta peça?')) return;
    try {
      await partService.delete(id);
      toast.success('Peça excluída');
      setEditingPart(null);
      setIsPartFormOpen(false);
      fetchParts();
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Erro ao excluir peça';
      toast.error(msg);
    }
  };

  // Tags Handlers
  const handleCreateTag = async (data: CreateTagDTO) => {
    try {
      await tagService.create(data);
      toast.success('Tag criada com sucesso!');
      setIsTagFormOpen(false);
      fetchTags();
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Erro ao criar tag';
      toast.error(msg);
    }
  };

  const handleUpdateTag = async (data: UpdateTagDTO) => {
    if (!editingTag) return;
    try {
      await tagService.update(editingTag.id, data);
      toast.success('Tag atualizada com sucesso!');
      setEditingTag(null);
      setIsTagFormOpen(false);
      fetchTags();
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Erro ao atualizar tag';
      toast.error(msg);
    }
  };

  const handleDeleteTag = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta tag?')) return;
    try {
      await tagService.delete(id);
      toast.success('Tag excluída');
      setEditingTag(null);
      setIsTagFormOpen(false);
      fetchTags();
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Erro ao excluir tag';
      toast.error(msg);
    }
  };

  // Parts Modal Controls
  const openCreatePart = () => {
    setEditingPart(null);
    setIsPartFormOpen(true);
  };

  const openEditPart = (part: Part) => {
    setEditingPart(part);
    setIsPartFormOpen(true);
  };

  const closePartForm = () => {
    setEditingPart(null);
    setIsPartFormOpen(false);
  };

  // Tags Modal Controls
  const openCreateTag = () => {
    setEditingTag(null);
    setIsTagFormOpen(true);
  };

  const openEditTag = (tag: Tag) => {
    setEditingTag(tag);
    setIsTagFormOpen(true);
  };

  const closeTagForm = () => {
    setEditingTag(null);
    setIsTagFormOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Toaster position="top-right" />
      <div className="max-w-8xl mx-auto space-y-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Parts Section */}
          <div className="space-y-6">
            {loadingParts ? (
              <div className="text-center py-12 text-gray-500">Carregando peças...</div>
            ) : (
              <PartsTable
                items={parts}
                onEdit={openEditPart}
                onCreate={openCreatePart}
              />
            )}
          </div>

          {/* Tags Section */}
          <div className="space-y-6">
            {loadingTags ? (
              <div className="text-center py-12 text-gray-500">Carregando tags...</div>
            ) : (
              <TagsTable
                items={tags}
                onEdit={openEditTag}
                onCreate={openCreateTag}
              />
            )}
          </div>
        </div>

        {/* Forms */}
        <PartForm
          isOpen={isPartFormOpen}
          onClose={closePartForm}
          editingPart={editingPart}
          onSubmit={editingPart ? handleUpdatePart : handleCreatePart}
          onDelete={handleDeletePart}
        />

        <TagForm
          isOpen={isTagFormOpen}
          onClose={closeTagForm}
          editingTag={editingTag}
          onSubmit={editingTag ? handleUpdateTag : handleCreateTag}
          onDelete={handleDeleteTag}
        />

      </div>
    </div>
  );
}
