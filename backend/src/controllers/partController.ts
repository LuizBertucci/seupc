import { Request, Response } from 'express';
import { partService } from '../services/partService';
import { CreatePartSchema, UpdatePartSchema, PartType } from '../models/partModel';
import { z } from 'zod';

const getAll = async (req: Request, res: Response) => {
  try {
    const type = req.query.type as PartType | undefined;

    if (type) {
      if (!Object.values(PartType).includes(type)) {
        return res.status(400).json({ success: false, message: 'Invalid type' });
      }
      const parts = await partService.getPartsByType(type);
      return res.json({ success: true, data: parts });
    }

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

const count = async (req: Request, res: Response) => {
  try {
    const type = req.query.type as PartType | undefined;
    const q = (req.query.q as string | undefined) || undefined;

    if (type && !Object.values(PartType).includes(type)) {
      return res.status(400).json({ success: false, message: 'Invalid type' });
    }

    const total = await partService.countParts(type, q);
    res.json({ success: true, data: { total } });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const search = async (req: Request, res: Response) => {
  try {
    const SearchSchema = z.object({
      type: z.nativeEnum(PartType).optional(),
      q: z.string().min(1),
      limit: z.string().optional(),
    });

    const parsed = SearchSchema.safeParse(req.query);
    if (!parsed.success) {
      return res.status(400).json({ success: false, errors: parsed.error.issues });
    }

    const limitNumber = parsed.data.limit ? Number(parsed.data.limit) : undefined;
    if (limitNumber !== undefined && (Number.isNaN(limitNumber) || limitNumber < 1)) {
      return res.status(400).json({ success: false, message: 'Invalid limit' });
    }

    const parts = await partService.searchParts(parsed.data.type, parsed.data.q, limitNumber);
    res.json({ success: true, data: parts });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const partController = {
  getAll,
  count,
  search,
  getById,
  create,
  update,
  delete: remove
};
