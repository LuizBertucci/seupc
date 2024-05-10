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
  has_stock: row.has_stock,
  published: row.published,
  operating_system: row.operating_system ?? '',
  manufacturer_id: row.manufacturer_id ?? '',
  weight: row.weight ?? '',
  createdAt: new Date(row.created_at),
  updatedAt: new Date(row.updated_at),
});

export const notebookRepository = {
  findAllAsync: async (): Promise<Notebook[]> => {
    const rows = await knex('notebooks').select('*');

    return rows.map(toModel);
  },

  findByIdAsync: async (id: string): Promise<Notebook | null> => {
    const row = await knex('notebooks').select('*').where('id', id).first();

    if (!row) {
      return null;
    }

    return toModel(row);
  },

  create: async (notebook: Notebook): Promise<Notebook> => {
    const {
      id,
      name,
      brand,
      color,
      screen_size,
      screen_resolution,
      battery,
      has_numeric_keypad,
      has_stock,
      published,
      operating_system,
      manufacturer_id,
      weight,
    } = notebook;

    const [result] = await knex('notebooks')
      .insert({
        id,
        name,
        brand,
        color,
        screen_size,
        screen_resolution,
        battery,
        has_numeric_keypad,
        has_stock,
        published,
        operating_system,
        manufacturer_id,
        weight,
        created_at: new Date(),
        updated_at: new Date(),
      })
      .returning('*');

    return toModel(result);
  },
};
