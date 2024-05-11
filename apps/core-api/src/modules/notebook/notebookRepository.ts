import { arrayBind } from '@common/utils/arrayBinding';
import { Notebook, NotebookPartTuple, NotebookRowSchema } from '@modules/notebook/notebookModel';
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

  create: async (notebook: Notebook, partsIds?: string[]): Promise<Notebook> => {
    try {
      return knex.transaction(async (trx) => {
        const { rows } = await trx.raw(
          'INSERT INTO notebooks (id, name, brand, color, screen_size, screen_resolution, battery, has_numeric_keypad, has_stock, published, operating_system, manufacturer_id, weight, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING *',
          [
            notebook.id,
            notebook.name,
            notebook.brand,
            notebook.color,
            notebook.screen_size,
            notebook.screen_resolution,
            notebook.battery,
            notebook.has_numeric_keypad,
            notebook.has_stock,
            notebook.published,
            notebook.operating_system,
            notebook.manufacturer_id,
            notebook.weight,
            notebook.createdAt,
            notebook.updatedAt,
          ]
        );

        if (partsIds?.length) {
          const values = partsIds.map(() => `(?, ?)`).join(', ');
          await trx.raw(
            `INSERT INTO notebook_parts (notebook_id, part_id) VALUES ${values} ON CONFLICT DO NOTHING`,
            partsIds.flatMap((partId) => [notebook.id, partId])
          );
        }
        return toModel(rows[0]);
      });
    } catch (error) {
      throw error;
    }
  },

  addParts: async (data: NotebookPartTuple[]): Promise<void> => {
    if (!data.length) {
      return;
    }

    const values = data.map(() => `(?, ?)`).join(', ');
    await knex.raw(
      `INSERT INTO notebook_parts (notebook_id, part_id) VALUES ${values} ON CONFLICT DO NOTHING`,
      data.flatMap(({ notebookId, partId }) => [notebookId, partId])
    );
  },

  findByIdsAsync: async (ids: string[]): Promise<Notebook[]> => {
    if (!ids.length) {
      return [];
    }
    const { rows } = await knex.raw(`SELECT t.* FROM notebooks t WHERE t.id IN ${arrayBind(ids)}`, [...ids]);
    return rows.map(toModel);
  },
};
