import { z } from 'zod';
import { supabase } from '../config/supabase';

const TagSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  processor_id: z.string().uuid().nullable(),
  ram_memory_id: z.string().uuid().nullable(),
  hd_id: z.string().uuid().nullable(),
  ssd_id: z.string().uuid().nullable(),
  video_card_id: z.string().uuid().nullable(),
  created_at: z.string().or(z.date()),
  updated_at: z.string().or(z.date()),
});

type Tag = z.infer<typeof TagSchema>;

const CreateTagSchema = z.object({
  name: z.string().min(1),
  processor_id: z.string().uuid().nullable().optional(),
  ram_memory_id: z.string().uuid().nullable().optional(),
  hd_id: z.string().uuid().nullable().optional(),
  ssd_id: z.string().uuid().nullable().optional(),
  video_card_id: z.string().uuid().nullable().optional(),
});

type CreateTagDTO = z.infer<typeof CreateTagSchema>;

const UpdateTagSchema = CreateTagSchema.partial();

type UpdateTagDTO = z.infer<typeof UpdateTagSchema>;

const TagModel = {
  findAll: async () => {
    const { data, error } = await supabase
      .from('tags')
      .select(`
        *,
        processor:parts!processor_id(name),
        ram_memory:parts!ram_memory_id(name),
        hd:parts!hd_id(name),
        ssd:parts!ssd_id(name),
        video_card:parts!video_card_id(name)
      `)
      .order('created_at', { ascending: false });
    
    if (error) throw new Error(error.message);
    return data;
  },

  findById: async (id: string) => {
    const { data, error } = await supabase
      .from('tags')
      .select(`
        *,
        processor:parts!processor_id(name),
        ram_memory:parts!ram_memory_id(name),
        hd:parts!hd_id(name),
        ssd:parts!ssd_id(name),
        video_card:parts!video_card_id(name)
      `)
      .eq('id', id)
      .single();
    
    if (error) return null;
    return data;
  },

  findByName: async (name: string) => {
    const { data, error } = await supabase
      .from('tags')
      .select('*')
      .ilike('name', name)
      .maybeSingle();
    
    if (error) throw new Error(error.message);
    return data as Tag | null;
  },

  create: async (tag: CreateTagDTO) => {
    const { data, error } = await supabase
      .from('tags')
      .insert({
        name: tag.name,
        processor_id: tag.processor_id,
        ram_memory_id: tag.ram_memory_id,
        hd_id: tag.hd_id,
        ssd_id: tag.ssd_id,
        video_card_id: tag.video_card_id,
      })
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as Tag;
  },

  update: async (id: string, tag: UpdateTagDTO) => {
    const updates: any = { updated_at: new Date().toISOString() };
    if (tag.name !== undefined) updates.name = tag.name;
    if (tag.processor_id !== undefined) updates.processor_id = tag.processor_id;
    if (tag.ram_memory_id !== undefined) updates.ram_memory_id = tag.ram_memory_id;
    if (tag.hd_id !== undefined) updates.hd_id = tag.hd_id;
    if (tag.ssd_id !== undefined) updates.ssd_id = tag.ssd_id;
    if (tag.video_card_id !== undefined) updates.video_card_id = tag.video_card_id;

    const { data, error } = await supabase
      .from('tags')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as Tag;
  },

  delete: async (id: string) => {
    const { error } = await supabase
      .from('tags')
      .delete()
      .eq('id', id);

    if (error) throw new Error(error.message);
    return true;
  }
};

export {
  TagSchema,
  CreateTagSchema,
  UpdateTagSchema,
  TagModel
};

export type {
  Tag,
  CreateTagDTO,
  UpdateTagDTO
};
