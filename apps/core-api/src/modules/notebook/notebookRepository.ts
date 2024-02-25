import { Notebook } from '@modules/notebook/notebookModel';

export const notebooks: Notebook[] = [
  { id: 1, title: 'Notebook 1', createdAt: new Date(), updatedAt: new Date() },
  { id: 2, title: 'Notebook 2', createdAt: new Date(), updatedAt: new Date() },
];

export const notebookRepository = {
  findAllAsync: async (): Promise<Notebook[]> => {
    return notebooks;
  },

  findByIdAsync: async (id: number): Promise<Notebook | null> => {
    return notebooks.find((n) => n.id === id) || null;
  },
};
