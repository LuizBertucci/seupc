import { Part, CreatePartDTO, UpdatePartDTO, PartType } from '../types/part';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const getAll = async (): Promise<Part[]> => {
  const res = await fetch(`${API_URL}/parts`);
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to fetch parts: ${res.status} ${errorText}`);
  }
  const data = await res.json();
  if (!data.success) throw new Error(data.message);
  return data.data;
};

const getByType = async (type: PartType): Promise<Part[]> => {
  const params = new URLSearchParams({ type });
  const res = await fetch(`${API_URL}/parts?${params.toString()}`);
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to fetch parts by type: ${res.status} ${errorText}`);
  }
  const data = await res.json();
  if (!data.success) throw new Error(data.message);
  return data.data;
};

const getById = async (id: string): Promise<Part> => {
  const res = await fetch(`${API_URL}/parts/${id}`);
  const data = await res.json();
  if (!data.success) throw new Error(data.message);
  return data.data;
};

const search = async (type: PartType, q: string, limit = 20): Promise<Part[]> => {
  const params = new URLSearchParams({ type, q, limit: String(limit) });
  const res = await fetch(`${API_URL}/parts/search?${params.toString()}`);
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to search parts: ${res.status} ${errorText}`);
  }
  const data = await res.json();
  if (!data.success) throw new Error(data.message);
  return data.data;
};

const create = async (part: CreatePartDTO): Promise<Part> => {
  const res = await fetch(`${API_URL}/parts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(part),
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message || 'Failed to create part');
  return data.data;
};

const update = async (id: string, part: UpdatePartDTO): Promise<Part> => {
  const res = await fetch(`${API_URL}/parts/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(part),
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message || 'Failed to update part');
  return data.data;
};

const remove = async (id: string): Promise<void> => {
  const res = await fetch(`${API_URL}/parts/${id}`, {
    method: 'DELETE',
  });
  if (res.status === 204) return;
  const data = await res.json();
  if (!data.success) throw new Error(data.message || 'Failed to delete part');
};

export const partService = {
  getAll,
  getByType,
  search,
  getById,
  create,
  update,
  delete: remove,
};
