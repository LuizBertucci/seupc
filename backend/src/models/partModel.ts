import { z } from 'zod';
import { supabase } from '../config/supabase';

enum PartType {
  PROCESSOR = 'Processor',
  RAM_MEMORY = 'Ram Memory',
  HD = 'HD',
  SSD = 'SSD',
  VIDEO_CARD = 'Video Card',
}

const PartSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  part_type: z.nativeEnum(PartType),
  point: z.number().int().positive(),
  created_at: z.string().or(z.date()),
  updated_at: z.string().or(z.date()),
});

type Part = z.infer<typeof PartSchema>;

const CreatePartSchema = z.object({
  name: z.string().min(1),
  partType: z.nativeEnum(PartType),
  point: z.number().int().positive(),
});

type CreatePartDTO = z.infer<typeof CreatePartSchema>;

const UpdatePartSchema = z.object({
  name: z.string().min(1).optional(),
  point: z.number().int().positive().optional(),
});

type UpdatePartDTO = z.infer<typeof UpdatePartSchema>;

// Active Record style Model
const PartModel = {
  findAll: async () => {
    const { data, error } = await supabase
      .from('parts')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw new Error(error.message);
    return data as Part[];
  },

  findById: async (id: string) => {
    const { data, error } = await supabase
      .from('parts')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) return null;
    return data as Part;
  },

  findByName: async (name: string) => {
    const { data, error } = await supabase
      .from('parts')
      .select('*')
      .ilike('name', name) // Case insensitive check
      .maybeSingle();
    
    if (error) throw new Error(error.message);
    return data as Part | null;
  },

  create: async (part: CreatePartDTO) => {
    const { data, error } = await supabase
      .from('parts')
      .insert({
        name: part.name,
        part_type: part.partType,
        point: part.point,
      })
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as Part;
  },

  update: async (id: string, part: UpdatePartDTO) => {
    const updates: any = { updated_at: new Date().toISOString() };
    if (part.name) updates.name = part.name;
    if (part.point) updates.point = part.point;

    const { data, error } = await supabase
      .from('parts')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as Part;
  },

  delete: async (id: string) => {
    const { error } = await supabase
      .from('parts')
      .delete()
      .eq('id', id);

    if (error) throw new Error(error.message);
    return true;
  }
};

export {
  PartType,
  PartSchema,
  CreatePartSchema,
  UpdatePartSchema,
  PartModel
};

export type {
  Part,
  CreatePartDTO,
  UpdatePartDTO
};
