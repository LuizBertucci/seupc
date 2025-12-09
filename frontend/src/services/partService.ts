import { Part, CreatePartDTO, UpdatePartDTO, PartType } from '../types/part';

type PaginatedParts = { items: Part[]; total: number };

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const list = async (params?: { page?: number; pageSize?: number; q?: string; type?: PartType }): Promise<PaginatedParts> => {
  const page = params?.page ?? 1;
  const pageSize = params?.pageSize ?? 10;
  const queryParams = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
  });

  if (params?.q) queryParams.set('q', params.q);
  if (params?.type) queryParams.set('type', params.type);

  const res = await fetch(`${API_URL}/parts?${queryParams.toString()}`);
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to fetch parts: ${res.status} ${errorText}`);
  }
  const data = await res.json();
  if (!data.success) throw new Error(data.message);
  return data.data as PaginatedParts;
};

const getByType = async (type: PartType, pageSize = 100): Promise<Part[]> => {
  const { items } = await list({ type, page: 1, pageSize });
  return items;
};

const getById = async (id: string): Promise<Part> => {
  const res = await fetch(`${API_URL}/parts/${id}`);
  const data = await res.json();
  if (!data.success) throw new Error(data.message);
  return data.data;
};

const count = async (q?: string, type?: PartType): Promise<number> => {
  const params = new URLSearchParams();
  if (q) params.set('q', q);
  if (type) params.set('type', type);
  const url = params.toString() ? `${API_URL}/parts/count?${params.toString()}` : `${API_URL}/parts/count`;
  const res = await fetch(url);
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to count parts: ${res.status} ${errorText}`);
  }
  const data = await res.json();
  if (!data.success) throw new Error(data.message);
  return data.data.total;
};

const search = async (type: PartType | undefined, q: string, limit = 20): Promise<Part[]> => {
  const params = new URLSearchParams({ q, limit: String(limit) });
  if (type) params.set('type', type);
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
  list,
  getByType,
  count,
  search,
  getById,
  create,
  update,
  delete: remove,
};
