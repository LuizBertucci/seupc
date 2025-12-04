export interface Tag {
  id: string;
  name: string;
  processor_id?: string | null;
  ram_memory_id?: string | null;
  hd_id?: string | null;
  ssd_id?: string | null;
  video_card_id?: string | null;
  created_at: string | Date;
  updated_at: string | Date;
  
  // Expanded relations
  processor?: { name: string };
  ram_memory?: { name: string };
  hd?: { name: string };
  ssd?: { name: string };
  video_card?: { name: string };
}

export interface CreateTagDTO {
  name: string;
  processor_id?: string | null;
  ram_memory_id?: string | null;
  hd_id?: string | null;
  ssd_id?: string | null;
  video_card_id?: string | null;
}

export interface UpdateTagDTO {
  name?: string;
  processor_id?: string | null;
  ram_memory_id?: string | null;
  hd_id?: string | null;
  ssd_id?: string | null;
  video_card_id?: string | null;
}
