import knex from '@src/index';
import { arrayBind } from '@common/utils/arrayBinding';
import { Cluster, ClusterRowSchema } from '@modules/clusterOfTags/clusterModel';

const toModel = (row: ClusterRowSchema): Cluster => ({
  id: row.id,
  name: row.name,
  createdAt: new Date(row.created_at),
  updatedAt: new Date(row.updated_at),
  type: row.type,
});

export const clusterRepository = {
  getAll: async (): Promise<Cluster[]> => {
    const { rows } = await knex.raw('SELECT ct.* FROM cluster_of_tags ct');

    return rows.map(toModel);
  },
  get: async (id: string): Promise<Cluster | null> => {
    const { rows } = await knex.raw('SELECT ct.* FROM cluster_of_tags ct WHERE ct.id = ?', [id]);
    return rows.length === 0 ? null : toModel(rows[0]);
  },
  create: async (cluster: Cluster, tagsIds: string[] = []): Promise<Cluster> => {
    return knex.transaction(async (trx) => {
      const { rows } = await trx.raw(
        'INSERT INTO cluster_of_tags (id, name, created_at, updated_at, type) VALUES (?, ?, ?, ?, ?) RETURNING *',
        [cluster.id, cluster.name, cluster.createdAt, cluster.updatedAt, cluster.type]
      );

      if (tagsIds?.length) {
        const values = tagsIds.map(() => `(?, ?)`).join(', ');
        await trx.raw(
          `INSERT INTO cluster_of_tags_tags (cluster_id, tag_id) VALUES ${values} ON CONFLICT DO NOTHING`,
          tagsIds.flatMap((tagId) => [cluster.id, tagId])
        );
      }
      return toModel(rows[0]);
    });
  },
  update: async (tag: Cluster): Promise<Cluster> => {
    const { rows } = await knex.raw('UPDATE cluster_of_tags SET name = ?, updated_at =? WHERE id =? RETURNING *', [
      tag.name,
      tag.updatedAt,
      tag.id,
    ]);
    return toModel(rows);
  },
  delete: async (id: string): Promise<void> => {
    await knex.transaction(async (trx) => {
      await knex.raw('DELETE FROM cluster_of_tags_tags WHERE cluster_id = ?', [id]).transacting(trx);
      await knex.raw('DELETE FROM cluster_of_tags WHERE id = ?', [id]).transacting(trx);
    });
  },
  batchGet: async (ids: string[]): Promise<Cluster[]> => {
    if (!ids.length) {
      return [];
    }
    const { rows } = await knex.raw(`SELECT ct.* FROM cluster_of_tags ct WHERE t.id IN ${arrayBind(ids)}`, [...ids]);
    return rows.map(toModel);
  },
};
