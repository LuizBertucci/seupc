import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.table('notebooks', (table) => {
    table.boolean('published').defaultTo(false);
    table.boolean('has_stock').defaultTo(true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table('notebooks', (table) => {
    table.dropColumn('published');
    table.dropColumn('has_stock');
  });
}
