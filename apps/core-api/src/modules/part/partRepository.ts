import knex from '@src/index';
import { Part, PartRowSchema } from '@modules/part/partModel';
import { arrayBind } from '@common/utils/arrayBinding';

const toModel = (row: PartRowSchema): Part => ({
  id: row.id,
  name: row.name,
  createdAt: new Date(row.created_at),
  updatedAt: new Date(row.updated_at),
  partType: row.part_type,
  point: row.point,
});

export const partRepository = {
  findByNameAsync: async (name: string): Promise<Part | null> => {
    const { rows } = await knex.raw('SELECT p.* FROM parts p WHERE LOWER(p.name) = LOWER(?)', [name]);

    if (rows.length === 0) {
      return null;
    }
    return toModel(rows[0]);
  },
  findAllAsync: async (): Promise<Part[]> => {
    const { rows } = await knex.raw('SELECT p.* FROM parts p');

    return rows.map(toModel);
  },
  findByIdAsync: async (id: string): Promise<Part | null> => {
    const { rows } = await knex.raw('SELECT p.* FROM parts p WHERE p.id = ?', [id]);

    if (rows.length === 0) {
      return null;
    }

    return toModel(rows[0]);
  },
  create: async (part: Part): Promise<Part> => {
    const { rows } = await knex.raw(
      'INSERT INTO parts (id, name, created_at, updated_at, part_type, point) VALUES (?, ?, ?, ?, ?, ?) RETURNING *',
      [part.id, part.name, part.createdAt, part.updatedAt, part.partType, part.point]
    );

    return toModel(rows);
  },
  update: async (part: Part): Promise<Part> => {
    const { rows } = await knex.raw('UPDATE parts SET name = ?, updated_at =?, point =? WHERE id =? RETURNING *', [
      part.name,
      part.updatedAt,
      part.point,
      part.id,
    ]);
    return toModel(rows);
  },
  delete: async (id: string): Promise<void> => {
    await knex.transaction(async (trx) => {
      await knex.raw('DELETE FROM tag_parts WHERE part_id = ?', [id]).transacting(trx);
      await knex.raw('DELETE FROM parts p WHERE p.id = ?', [id]).transacting(trx);
    });
  },
  findByIdsAsync: async (ids: string[]): Promise<Part[]> => {
    if (!ids.length) {
      return [];
    }
    const { rows } = await knex.raw(`SELECT p.* FROM parts p WHERE p.id IN ${arrayBind(ids)}`, [...ids]);
    return rows.map(toModel);
  },
};
