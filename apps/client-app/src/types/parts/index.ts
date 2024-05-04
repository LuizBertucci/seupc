// Main Types

export enum PartTypeEnum {
  Processor = 'Processor',
  RamMemory = 'Ram Memory',
  HD = 'HD',
  SSD = 'SSD',
  VideoCard = 'Video Card'
}

type PartType = PartTypeEnum.HD | PartTypeEnum.SSD | PartTypeEnum.Processor | PartTypeEnum.RamMemory | PartTypeEnum.VideoCard;


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
  category: 'Games' | 'Programs' | 'Courses';
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export type AddPartsToTag = {
  processors?: string;
  ram?: string;
  hd?: string;
  ssd?: string;
  gpu?: string;
}

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
