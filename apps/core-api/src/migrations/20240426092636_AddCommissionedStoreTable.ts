import type { Knex } from 'knex';
import { v4 as uuidv4 } from 'uuid';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('commissioned_stores', function (table) {
    table.uuid('id').primary().defaultTo(uuidv4());
    table.enum('commissioned_company', ['Magalu', 'Amazon']).notNullable();
    table.uuid('notebook_id').notNullable();
    table.text('product_url').notNullable();
    table.text('commissioned_url').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());

    table.foreign('notebook_id').references('id').inTable('notebooks');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('commissioned_stores');
}
