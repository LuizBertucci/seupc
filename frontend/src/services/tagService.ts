import { Tag, CreateTagDTO, UpdateTagDTO } from '../types/tag';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const getAll = async (): Promise<Tag[]> => {
  const res = await fetch(`${API_URL}/tags`);
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to fetch tags: ${res.status} ${errorText}`);
  }
  const data = await res.json();
  if (!data.success) throw new Error(data.message);
  return data.data;
};

const getById = async (id: string): Promise<Tag> => {
  const res = await fetch(`${API_URL}/tags/${id}`);
  const data = await res.json();
  if (!data.success) throw new Error(data.message);
  return data.data;
};

const count = async (q?: string): Promise<number> => {
  const params = new URLSearchParams();
  if (q) params.set('q', q);
  const url = params.toString() ? `${API_URL}/tags/count?${params.toString()}` : `${API_URL}/tags/count`;
  const res = await fetch(url);
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to count tags: ${res.status} ${errorText}`);
  }
  const data = await res.json();
  if (!data.success) throw new Error(data.message);
  return data.data.total;
};

const search = async (q: string, limit = 50): Promise<Tag[]> => {
  const params = new URLSearchParams({ q, limit: String(limit) });
  const res = await fetch(`${API_URL}/tags/search?${params.toString()}`);
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to search tags: ${res.status} ${errorText}`);
  }
  const data = await res.json();
  if (!data.success) throw new Error(data.message);
  return data.data;
};

const create = async (tag: CreateTagDTO): Promise<Tag> => {
  const res = await fetch(`${API_URL}/tags`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(tag),
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message || 'Failed to create tag');
  return data.data;
};

const update = async (id: string, tag: UpdateTagDTO): Promise<Tag> => {
  const res = await fetch(`${API_URL}/tags/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(tag),
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message || 'Failed to update tag');
  return data.data;
};

const remove = async (id: string): Promise<void> => {
  const res = await fetch(`${API_URL}/tags/${id}`, {
    method: 'DELETE',
  });
  if (res.status === 204) return;
  const data = await res.json();
  if (!data.success) throw new Error(data.message || 'Failed to delete tag');
  return;
};

export const tagService = {
  getAll,
  getById,
  count,
  search,
  create,
  update,
  delete: remove,
};
