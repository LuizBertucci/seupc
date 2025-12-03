import { Part, CreatePartDTO, UpdatePartDTO } from '../types/part';

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

const getById = async (id: string): Promise<Part> => {
  const res = await fetch(`${API_URL}/parts/${id}`);
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
  getById,
  create,
  update,
  delete: remove,
};
