import { Notebook } from '@modules/notebook/notebookModel';
import knex from '../../index';

export const notebookRepository = {
  findAllAsync: async (): Promise<Notebook[]> => {
    const { rows } = await knex.raw('SELECT id, title, created_at, updated_at FROM notebooks');

    const result: Notebook[] = rows.map((row: any) => ({
      id: row.id,
      title: row.title,
      createdAt: new Date(row.createdat),
      updatedAt: new Date(row.updatedat),
    }));

    return result;
  },

  findByIdAsync: async (id: string): Promise<Notebook | null> => {
    const { rows } = await knex.raw('SELECT id, title, created_at, updated_at FROM notebooks WHERE id = ?', [id]);

    if (rows.length === 0) {
      return null;
    }

    const result: Notebook = {
      id: rows[0].id,
      title: rows[0].title,
      createdAt: new Date(rows[0].createdat),
      updatedAt: new Date(rows[0].updatedat),
    };

    return result;
  },

  createNotebook: async (notebook: Notebook): Promise<Notebook> => {
    const { rows } = await knex.raw(
      'INSERT INTO notebooks (id, title, created_at, updated_at) VALUES (?, ?, ?, ?) RETURNING *',
      [notebook.id, notebook.title, notebook.createdAt, notebook.updatedAt]
    );

    const result: Notebook = {
      id: rows[0].id,
      title: rows[0].title,
      createdAt: new Date(rows[0].createdat),
      updatedAt: new Date(rows[0].updatedat),
    };

    return result;
  },
};
