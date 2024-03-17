// Main Types
export type Parts = {
  partType: 'Processor' | 'Ram Memory' | 'HD' | 'SSD' | 'Video Card',
  name: string
  point: number
  id: string,
  createdAt: string,
  updatedAt: string
  }

// Components Types
 export type SelectOption = {
    value: string,
    label: string
  }