import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('notebook_parts', (table) => {
    table.unique(['notebook_id', 'part_id']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('notebook_parts', (table) => {
    table.dropUnique(['notebook_id', 'part_id']);
  });
}
