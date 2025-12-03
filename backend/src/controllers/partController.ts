import { Request, Response } from 'express';
import { partService } from '../services/partService';
import { CreatePartSchema, UpdatePartSchema } from '../models/partModel';
import { z } from 'zod';

const getAll = async (_req: Request, res: Response) => {
  try {
    const parts = await partService.getAllParts();
    res.json({ success: true, data: parts });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getById = async (req: Request, res: Response) => {
  try {
    const part = await partService.getPartById(req.params.id);
    res.json({ success: true, data: part });
  } catch (error: any) {
    const status = error.message === 'Part not found' ? 404 : 500;
    res.status(status).json({ success: false, message: error.message });
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const data = CreatePartSchema.parse(req.body);
    const newPart = await partService.createPart(data);
    res.status(201).json({ success: true, data: newPart });
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
    const data = UpdatePartSchema.parse(req.body);
    const updatedPart = await partService.updatePart(req.params.id, data);
    res.json({ success: true, data: updatedPart });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ success: false, errors: error.issues });
    }
    const status = error.message === 'Part not found' ? 404 : 
                   error.message.includes('already exists') ? 409 : 500;
    res.status(status).json({ success: false, message: error.message });
  }
};

const remove = async (req: Request, res: Response) => {
  try {
    await partService.deletePart(req.params.id);
    res.status(204).send();
  } catch (error: any) {
    const status = error.message === 'Part not found' ? 404 : 500;
    res.status(status).json({ success: false, message: error.message });
  }
};

export const partController = {
  getAll,
  getById,
  create,
  update,
  delete: remove
};
