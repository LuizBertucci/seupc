// Main Types
export type Parts = {
  partType: 'Processor' | 'Ram Memory' | 'HD' | 'SSD' | 'Video Card',
  name: string
  point: number
  id: string,
  createdAt: string,
  updatedAt: string
  }

export type TagCategoria = {
  GAMES: 'Games',
  PROGRAMS: 'Programs',
  COURSES: 'Courses'
}

export type Tags = {
  name: string
  category: 'Games' | 'Programs' | 'Courses'
}

// Components Types
 export type SelectOption = {
    value: string,
    label: string
  }