// Main Types
export type Parts = {
  partType: 'Processor' | 'Ram Memory' | 'HD' | 'SSD' | 'Video Card',
  name: string
  point: number
  id: string,
  createdAt: string,
  updatedAt: string
  }

export type Tags = {
  id: string;
  category: 'Games' | 'Programs' | 'Courses';
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CategoryTags = {
  category: string
}

// Components Types
 export type SelectOption = {
    value: string,
    label: string
  }