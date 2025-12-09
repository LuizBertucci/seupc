import { TagModel, CreateTagDTO, UpdateTagDTO } from '../models/tagModel';

const getPaginatedTags = async (page?: number, pageSize?: number, query?: string) => {
  return await TagModel.findPaginated({ page, pageSize, query });
};

const countTags = async (query: string | undefined) => {
  return await TagModel.countByQuery(query);
};

const searchTags = async (query: string, limit?: number) => {
  return await TagModel.searchByQuery(query, limit);
};

const getTagById = async (id: string) => {
  const tag = await TagModel.findById(id);
  if (!tag) {
    throw new Error('Tag not found');
  }
  return tag;
};

const createTag = async (data: CreateTagDTO) => {
  // Check for existing name
  const existing = await TagModel.findByName(data.name);
  if (existing) {
    throw new Error('A tag with this name already exists');
  }
  return await TagModel.create(data);
};

const updateTag = async (id: string, data: UpdateTagDTO) => {
  // Ensure tag exists
  await getTagById(id);
  
  // If updating name, check uniqueness
  if (data.name) {
    const existing = await TagModel.findByName(data.name);
    if (existing && existing.id !== id) {
      throw new Error('A tag with this name already exists');
    }
  }

  return await TagModel.update(id, data);
};

const deleteTag = async (id: string) => {
  // Ensure tag exists
  await getTagById(id);
  return await TagModel.delete(id);
};

export const tagService = {
  getPaginatedTags,
  countTags,
  searchTags,
  getTagById,
  createTag,
  updateTag,
  deleteTag
};
