import { PartModel, CreatePartDTO, UpdatePartDTO, PartType } from '../models/partModel';

const getPaginatedParts = async (page?: number, pageSize?: number, type?: PartType, query?: string) => {
  return await PartModel.findPaginated({ page, pageSize, type, query });
};

const getPartsByType = async (type: PartType) => {
  return await PartModel.findByType(type);
};

const countParts = async (type: PartType | undefined, query: string | undefined) => {
  return await PartModel.countByQuery(type, query);
};

const searchParts = async (type: PartType | undefined, query: string, limit?: number) => {
  return await PartModel.searchByTypeAndQuery(type, query, limit);
};

const getPartById = async (id: string) => {
  const part = await PartModel.findById(id);
  if (!part) {
    throw new Error('Part not found');
  }
  return part;
};

const createPart = async (data: CreatePartDTO) => {
  // Check for existing name
  const existing = await PartModel.findByName(data.name);
  if (existing) {
    throw new Error('A part with this name already exists');
  }
  return await PartModel.create(data);
};

const updatePart = async (id: string, data: UpdatePartDTO) => {
  // Ensure part exists
  await getPartById(id);
  
  // If updating name, check uniqueness
  if (data.name) {
    const existing = await PartModel.findByName(data.name);
    if (existing && existing.id !== id) {
      throw new Error('A part with this name already exists');
    }
  }

  return await PartModel.update(id, data);
};

const deletePart = async (id: string) => {
  // Ensure part exists
  await getPartById(id);
  return await PartModel.delete(id);
};

export const partService = {
  getPaginatedParts,
  getPartsByType,
  countParts,
  searchParts,
  getPartById,
  createPart,
  updatePart,
  deletePart
};
