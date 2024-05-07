import { Notebook, NotebookRowSchema } from '@modules/notebook/notebookModel';
import knex from '@src/index';

const toModel = (row: NotebookRowSchema): Notebook => ({
  id: row.id,
  name: row.name,
  brand: row.brand,
  color: row.color ?? '',
  screen_size: row.screen_size ?? '',
  screen_resolution: row.screen_resolution ?? '',
  battery: row.battery ?? '',
  has_numeric_keypad: row.has_numeric_keypad ?? false,
  operating_system: row.operating_system ?? '',
  manufacturer_id: row.manufacturer_id ?? '',
  weight: row.weight ?? '',
  createdAt: new Date(row.created_at),
  updatedAt: new Date(row.updated_at),
});

export const notebookRepository = {
  findAllAsync: async (): Promise<Notebook[]> => {
    const { rows } = await knex.raw('SELECT n.* FROM notebooks n');

    return rows.map(toModel);
  },
  findByIdAsync: async (id: string): Promise<Notebook | null> => {
    const { rows } = await knex.raw('SELECT n.* FROM notebooks n WHERE n.id = ?', [id]);

    if (rows.length === 0) {
      return null;
    }

    return toModel(rows[0]);
  },
  create: async (notebook: Notebook): Promise<Notebook> => {
    const { rows } = await knex.raw(
      'INSERT INTO notebooks (id, name, brand, color, screen_size, screen_resolution, battery, has_numeric_keypad, operating_system, manufacturer_id, weight, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING *',
      [
        notebook.id,
        notebook.name,
        notebook.brand,
        notebook.color,
        notebook.screen_size,
        notebook.screen_resolution,
        notebook.battery,
        notebook.has_numeric_keypad,
        notebook.operating_system,
        notebook.manufacturer_id,
        notebook.weight,
        notebook.createdAt,
        notebook.updatedAt,
      ]
    );

    return toModel(rows[0]);
  },
};
