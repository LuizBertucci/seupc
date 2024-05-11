import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('notebook_parts', function (table) {
    table.uuid('notebook_id').primary();
    table.uuid('part_id').primary();

    table.foreign('notebook_id').references('id').inTable('notebooks');
    table.foreign('part_id').references('id').inTable('parts');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('notebook_parts');
}
