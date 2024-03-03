import knex from '../../index';
import { Brand } from '@modules/brand/brandModel';

const toModel = (row: { id: string; name: string; status: string; createdat: string; updatedat: string }): Brand => ({
  id: row.id,
  name: row.name,
  status: row.status,
  createdAt: new Date(row.createdat),
  updatedAt: new Date(row.updatedat),
});

export const brandRepository = {
  findAllAsync: async (): Promise<Brand[]> => {
    const { rows } = await knex.raw('SELECT b.* FROM brands b');

    return rows.map(toModel);
  },

  findByIdAsync: async (id: string): Promise<Brand | null> => {
    const { rows } = await knex.raw('SELECT b.* FROM brands b WHERE b.id = ?', [id]);

    if (rows.length === 0) {
      return null;
    }

    return toModel(rows[0]);
  },

  createBrand: async (brand: Brand): Promise<Brand> => {
    const { rows } = await knex.raw(
      'INSERT INTO brands (id, name, status, created_at, updated_at) VALUES (?, ?, ?, ?, ?) RETURNING *',
      [brand.id, brand.name, brand.status.toUpperCase(), brand.createdAt, brand.updatedAt]
    );

    return toModel(rows);
  },
};
