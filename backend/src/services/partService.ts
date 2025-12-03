import { PartModel, CreatePartDTO, UpdatePartDTO } from '../models/partModel';

const getAllParts = async () => {
  return await PartModel.findAll();
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
  getAllParts,
  getPartById,
  createPart,
  updatePart,
  deletePart
};
