import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('notebook_parts');
}

export async function down(): Promise<void> {}
