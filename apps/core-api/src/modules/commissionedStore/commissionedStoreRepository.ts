import knex from '@src/index';
import { arrayBind } from '@common/utils/arrayBinding';
import { CommisionedStore, CommissionedStoreRowSchema } from '@modules/commissionedStore/commissionedStoreModel';

const toModel = (row: CommissionedStoreRowSchema): CommisionedStore => ({
  id: row.id,
  commissionedCompany: row.commissioned_company,
  notebookId: row.notebook_id,
  productUrl: row.product_url,
  commissionedUrl: row.commissioned_url,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

export const commissionedStoreRepository = {
  getAll: async (): Promise<CommisionedStore[]> => {
    const { rows } = await knex.raw('SELECT cs.* FROM commissioned_stores cs');

    return rows.map(toModel);
  },
  get: async (id: string): Promise<CommisionedStore | null> => {
    const { rows } = await knex.raw('SELECT cs.* FROM commissioned_stores cs where cs.id = ?', [id]);

    if (rows.length === 0) {
      return null;
    }

    return toModel(rows[0]);
  },
  create: async (commissionedStore: CommisionedStore): Promise<CommisionedStore> => {
    const { rows } = await knex.raw(
      'INSERT INTO commissioned_stores (id, commissioned_company, notebook_id, product_url, commissioned_url, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?) RETURNING *',
      [
        commissionedStore.id,
        commissionedStore.commissionedCompany,
        commissionedStore.notebookId,
        commissionedStore.productUrl,
        commissionedStore.commissionedUrl,
        commissionedStore.createdAt,
        commissionedStore.updatedAt,
      ]
    );

    return toModel(rows);
  },
  update: async (commissionedStore: CommisionedStore): Promise<CommisionedStore> => {
    const { rows } = await knex.raw(
      'UPDATE commissioned_stores SET commissioned_url =?, product_url = ?, updated_at =? WHERE id =? RETURNING *',
      [
        commissionedStore.commissionedUrl,
        commissionedStore.productUrl,
        commissionedStore.updatedAt,
        commissionedStore.id,
      ]
    );

    return toModel(rows);
  },
  delete: async (id: string): Promise<void> => {
    await knex.raw('DELETE FROM commissioned_stores WHERE id = ?', [id]);
  },
  batchGet: async (ids: string[]): Promise<CommisionedStore[]> => {
    if (!ids.length) {
      return [];
    }
    const { rows } = await knex.raw(`SELECT t.* FROM commissioned_stores cs WHERE cs.id IN ${arrayBind(ids)}`, [
      ...ids,
    ]);
    return rows.map(toModel);
  },
};
