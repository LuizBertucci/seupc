import knex from '@src/index';
import { Tag, TagRowSchema } from '@modules/tag/tagModel';


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
      'INSERT INTO tags t (id, name, created_at, updated_at, category) VALUES (?, ?, ?, ?, ?) RETURNING t.*',
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
};
