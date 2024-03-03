import knex from '../../index';
import { Brand } from '@modules/brand/brandModel';

const toModel = (row: { id: string; name: string; status: string; created_at: string; updated_at: string }): Brand => ({
  id: row.id,
  name: row.name,
  status: row.status,
  createdAt: new Date(row.created_at),
  updatedAt: new Date(row.updated_at),
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
  updateBrand: async (brand: Brand): Promise<Brand> => {
    const { rows } = await knex.raw(
      'UPDATE brands SET id = ?, name = ?, status = ?, created_at = ?, updated_at =? WHERE id = ? RETURNING *',
      [brand.id, brand.name, brand.status.toUpperCase(), brand.createdAt, brand.updatedAt, brand.id]
    );

    return toModel(rows);
  },
  deleteBrand: async (id: string): Promise<void> => {
    await knex.raw(
      'DELETE FROM brands WHERE id = ?',
      [id]
    );
  }
};
