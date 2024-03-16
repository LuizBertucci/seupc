import knex from '@src/index';
import { Tag, TagPartTuple, TagRowSchema } from '@modules/tag/tagModel';
import { arrayBind } from '@common/utils/arrayBinding';

const toModel = (row: TagRowSchema): Tag => ({
  id: row.id,
  name: row.name,
  createdAt: new Date(row.created_at),
  updatedAt: new Date(row.updated_at),
  category: row.category,
});

export const tagRepository = {
  findAllAsync: async (): Promise<Tag[]> => {
    const { rows } = await knex.raw('SELECT t.* FROM tags t');

    return rows.map(toModel);
  },
  findByIdAsync: async (id: string): Promise<Tag | null> => {
    const { rows } = await knex.raw('SELECT t.* FROM tags t WHERE t.id = ?', [id]);

    if (rows.length === 0) {
      return null;
    }

    return toModel(rows[0]);
  },
  create: async (part: Tag): Promise<Tag> => {
    const { rows } = await knex.raw(
      'INSERT INTO tags (id, name, created_at, updated_at, category) VALUES (?, ?, ?, ?, ?) RETURNING *',
      [part.id, part.name, part.createdAt, part.updatedAt, part.category]
    );

    return toModel(rows);
  },
  update: async (part: Tag): Promise<Tag> => {
    const { rows } = await knex.raw('UPDATE tags t SET t.name = ?, t.updated_at =? WHERE t.id =? RETURNING t.*', [
      part.name,
      part.updatedAt,
      part.id,
    ]);

    return toModel(rows);
  },
  delete: async (id: string): Promise<void> => {
    await knex.raw('DELETE FROM tags t WHERE t.id = ?', [id]);
  },
  addParts: async (data: TagPartTuple[]): Promise<void> => {
    if (!data.length) {
      return;
    }
    const values = data.map(() => `(?, ?)`).join(', ');
    await knex.raw(
      `INSERT INTO tag_parts (tag_id, part_id) VALUES ${values} ON CONFLICT DO NOTHING`,
      data.flatMap(({ tagId, partId }) => [tagId, partId])
    );
  },
  findByIdsAsync: async (ids: string[]): Promise<Tag[]> => {
    if (!ids.length) {
      return [];
    }
    const { rows } = await knex.raw(`SELECT t.* FROM tags t WHERE t.id IN ${arrayBind(ids)}`, [...ids]);
    return rows.map(toModel);
  },
};
