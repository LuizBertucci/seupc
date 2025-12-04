import { Request, Response } from 'express';
import { tagService } from '../services/tagService';
import { CreateTagSchema, UpdateTagSchema } from '../models/tagModel';
import { z } from 'zod';

const getAll = async (_req: Request, res: Response) => {
  try {
    const tags = await tagService.getAllTags();
    res.json({ success: true, data: tags });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getById = async (req: Request, res: Response) => {
  try {
    const tag = await tagService.getTagById(req.params.id);
    res.json({ success: true, data: tag });
  } catch (error: any) {
    const status = error.message === 'Tag not found' ? 404 : 500;
    res.status(status).json({ success: false, message: error.message });
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const data = CreateTagSchema.parse(req.body);
    const newTag = await tagService.createTag(data);
    res.status(201).json({ success: true, data: newTag });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ success: false, errors: error.issues });
    }
    const status = error.message.includes('already exists') ? 409 : 500;
    res.status(status).json({ success: false, message: error.message });
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const data = UpdateTagSchema.parse(req.body);
    const updatedTag = await tagService.updateTag(req.params.id, data);
    res.json({ success: true, data: updatedTag });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ success: false, errors: error.issues });
    }
    const status = error.message === 'Tag not found' ? 404 : 
                   error.message.includes('already exists') ? 409 : 500;
    res.status(status).json({ success: false, message: error.message });
  }
};

const remove = async (req: Request, res: Response) => {
  try {
    await tagService.deleteTag(req.params.id);
    res.status(204).send();
  } catch (error: any) {
    const status = error.message === 'Tag not found' ? 404 : 500;
    res.status(status).json({ success: false, message: error.message });
  }
};

export const tagController = {
  getAll,
  getById,
  create,
  update,
  delete: remove
};
