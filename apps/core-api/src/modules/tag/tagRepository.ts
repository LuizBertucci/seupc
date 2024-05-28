import { arrayBind } from '@common/utils/arrayBinding';
import { Part, PartRowSchema } from '@modules/part/partModel';
import { Tag, TagPartTuple, TagRowSchema } from '@modules/tag/tagModel';
import knex from '@src/index';
import { logger } from '@src/server';

const toModel = (row: TagRowSchema): Tag => {
  logger.info('Row data', row);
  return {
    id: row.id,
    name: row.name,
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
    category: row.category,
    parts: row.parts ? row.parts.map(toPartModel) : [],
  };
};

const toPartModel = (row: PartRowSchema): Part => ({
  id: row.id,
  partType: row.part_type,
  point: row.point,
  name: row.name,
  createdAt: new Date(row.created_at),
  updatedAt: new Date(row.updated_at),
});

export const tagRepository = {
  findAllAsync: async (): Promise<Tag[]> => {
    const { rows } = await knex.raw(`
      SELECT
        t.*,
        COALESCE(
          json_agg(
            json_build_object(
              'id', p.id,
              'name', p.name,
              'part_type', p.part_type,
              'point', p.point,
              'created_at', p.created_at,
              'updated_at', p.updated_at
            ) ORDER BY p.id
          ) FILTER (WHERE p.id IS NOT NULL),
          '[]'
        ) AS parts
      FROM tags t
      LEFT JOIN tag_parts tp ON t.id = tp.tag_id
      LEFT JOIN parts p ON tp.part_id = p.id
      GROUP BY t.id
    `);

    return rows.map(toModel);
  },
  findByIdAsync: async (id: string): Promise<Tag | null> => {
    const { rows } = await knex.raw(
      `
    SELECT
      t.*,
      COALESCE(
        json_agg(
          json_build_object(
            'id', p.id,
            'name', p.name,
            'part_type', p.part_type,
            'point', p.point,
            'created_at', p.created_at,
            'updated_at', p.updated_at
          ) ORDER BY p.id
        ) FILTER (WHERE p.id IS NOT NULL),
        '[]'
      ) AS parts
    FROM tags t
    LEFT JOIN tag_parts tp ON t.id = tp.tag_id
    LEFT JOIN parts p ON tp.part_id = p.id
    WHERE t.id = ?
    GROUP BY t.id
  `,
      [id]
    );

    if (rows.length === 0) {
      return null;
    }

    return toModel(rows[0]);
  },
  create: async (tag: Tag, partsIds?: string[]): Promise<Tag> => {
    try {
      return knex.transaction(async (trx) => {
        const { rows } = await trx.raw(
          'INSERT INTO tags (id, name, created_at, updated_at, category) VALUES (?, ?, ?, ?, ?) RETURNING *',
          [tag.id, tag.name, tag.createdAt, tag.updatedAt, tag.category]
        );

        if (partsIds?.length) {
          const values = partsIds.map(() => `(?, ?)`).join(', ');
          await trx.raw(
            `INSERT INTO tag_parts (tag_id, part_id) VALUES ${values}`,
            partsIds.flatMap((partId) => [tag.id, partId])
          );
        }
        return toModel(rows[0]);
      });
    } catch (error) {
      throw error;
    }
  },
  update: async (tag: Tag, partsIds?: string[]): Promise<Tag> => {
    try {
      return await knex.transaction(async (trx) => {
        const [updatedTag] = await trx('tags')
          .where('id', tag.id)
          .update({ name: tag.name, updated_at: tag.updatedAt })
          .returning('*');

        if (partsIds) {
          const newParts = await trx('parts').whereIn('id', partsIds).select('id', 'part_type');

          const existingParts = await trx('parts')
            .join('tag_parts', 'parts.id', 'tag_parts.part_id')
            .where('tag_parts.tag_id', tag.id)
            .select('parts.id', 'parts.part_type');

          const newPartsMap = new Map(newParts.map((part) => [part.part_type, part.id]));
          const existingPartsMap = new Map(existingParts.map((part) => [part.part_type, part.id]));

          const partsToDelete = [];
          const partsToInsert = [];

          for (const [partType, newPartId] of newPartsMap.entries()) {
            if (existingPartsMap.has(partType)) {
              partsToDelete.push(existingPartsMap.get(partType));
            }
            partsToInsert.push({ tag_id: tag.id, part_id: newPartId });
          }

          if (partsToDelete.length) {
            await trx('tag_parts').where('tag_id', tag.id).whereIn('part_id', partsToDelete).del();
          }

          if (partsToInsert.length) {
            await trx('tag_parts').insert(partsToInsert);
          }
        }

        return toModel(updatedTag);
      });
    } catch (error) {
      throw error;
    }
  },
  delete: async (id: string): Promise<void> => {
    await knex.transaction(async (trx) => {
      await knex.raw('DELETE FROM cluster_of_tags_tags WHERE tag_id = ?', [id]).transacting(trx);
      await knex.raw('DELETE FROM tag_parts WHERE tag_id = ?', [id]).transacting(trx);
      await knex.raw('DELETE FROM tags WHERE id = ?', [id]).transacting(trx);
    });
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
  batchGet: async (ids: string[]): Promise<Tag[]> => {
    if (!ids.length) {
      return [];
    }
    const { rows } = await knex.raw(`SELECT t.* FROM tags t WHERE t.id IN ${arrayBind(ids)}`, [...ids]);
    return rows.map(toModel);
  },
  getTagsByClusterId: async (clusterId: string): Promise<Tag[]> => {
    const { rows } = await knex.raw(
      `SELECT t.* FROM tags t left join cluster_of_tags_tags ctt on ctt.tag_id = t.id WHERE ctt.cluster_id = ?`,
      [clusterId]
    );
    return rows.map(toModel);
  },
};
