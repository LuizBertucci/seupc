import { Knex } from 'knex';
import { v4 as uuidv4 } from 'uuid';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('notebooks', (table) => {
    table.uuid('id').primary().defaultTo(uuidv4());
    table.string('title').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('notebooks');
}
