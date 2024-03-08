import { Notebook, NotebookRowSchema } from '@modules/notebook/notebookModel';
import knex from '../../index';

const toModel = (row: NotebookRowSchema): Notebook => ({
  id: row.id,
  title: row.title,
  createdAt: new Date(row.created_at),
  updatedAt: new Date(row.updated_at),
  brand: row.brand,
});

export const notebookRepository = {
  findAllAsync: async (): Promise<Notebook[]> => {
    const { rows } = await knex.raw('SELECT id, title, created_at, updated_at FROM notebooks');

    return rows.map(toModel);
  },

  findByIdAsync: async (id: string): Promise<Notebook | null> => {
    const { rows } = await knex.raw('SELECT id, title, created_at, updated_at FROM notebooks WHERE id = ?', [id]);

    if (rows.length === 0) {
      return null;
    }

    return toModel(rows[0]);
  },

  createNotebook: async (notebook: Notebook): Promise<Notebook> => {
    const { rows } = await knex.raw(
      'INSERT INTO notebooks (id, title, created_at, updated_at, brand) VALUES (?, ?, ?, ?, ?) RETURNING *',
      [notebook.id, notebook.title, notebook.createdAt, notebook.updatedAt, notebook.brand]
    );

    return toModel(rows[0]);
  },
};
