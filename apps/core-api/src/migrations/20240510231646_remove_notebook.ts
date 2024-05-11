import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('notebook_parts');
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.createTable('notebook_parts', (table) => {
    table.uuid('notebook_id').notNullable();
    table.uuid('part_id').notNullable();
    table.primary(['notebook_id', 'part_id']);
    table.foreign('notebook_id').references('id').inTable('notebooks').onDelete('CASCADE');
    table.foreign('part_id').references('id').inTable('parts').onDelete('CASCADE');
  });
}
