export enum PartType {
  PROCESSOR = 'Processor',
  RAM_MEMORY = 'RAM Memory',
  HD = 'HD',
  SSD = 'SSD',
  VIDEO_CARD = 'Video Card',
}

export interface Part {
  id: string;
  name: string;
  part_type: PartType;
  point: number;
  created_at: string | Date;
  updated_at: string | Date;
}

export interface CreatePartDTO {
  name: string;
  part_type: PartType;
  point: number;
}

export interface UpdatePartDTO {
  name?: string;
  point?: number;
}

