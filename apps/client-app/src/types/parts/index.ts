// Main Types

export enum PartTypeEnum {
  Processor = 'Processor',
  RamMemory = 'Ram Memory',
  HD = 'HD',
  SSD = 'SSD',
  VideoCard = 'Video Card',
}

type PartType =
  | PartTypeEnum.HD
  | PartTypeEnum.SSD
  | PartTypeEnum.Processor
  | PartTypeEnum.RamMemory
  | PartTypeEnum.VideoCard;

export enum TagCategoryEnum {
  Games = 'Games',
  Programs = 'Programs',
  Courses = 'Courses',
}

type TagCategory = TagCategoryEnum.Games | TagCategoryEnum.Programs | TagCategoryEnum.Courses;

export type Parts = {
  partType: PartType;
  name: string;
  point: number;
  id: string;
  createdAt: string;
  updatedAt: string;
};

export type Tags = {
  id: string;
  category: TagCategory;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export interface WriteTagDTO {
  category: TagCategory;
  name: string;
}

export type CreateTagDTO = WriteTagDTO & { partsIds: string[] };

export type AddParts = {
  processors?: string;
  ram?: string;
  hd?: string;
  ssd?: string;
  gpu?: string;
};

export type TagFormValue = WriteTagDTO & AddParts;

export type CategoryTags = {
  category: string;
};

export type Marca = {
  name: string;
};

export type Loja = {
  name: string;
};

export type Recomendacao = {
  name: string;
};

// Components Types
export type SelectOption<> = {
  value: string;
  label: string;
};
