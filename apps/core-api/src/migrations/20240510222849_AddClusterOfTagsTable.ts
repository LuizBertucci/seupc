import type { Knex } from 'knex';
import { v4 as uuidv4 } from 'uuid';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('cluster_of_tags', function (table) {
    table.uuid('id').primary().defaultTo(uuidv4());
    table.enum('type', ['University', 'Profile']).notNullable();
    table.string('name', 255).notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });

  await knex.schema.createTable('cluster_of_tags_tags', function (table) {
    table.uuid('cluster_id').primary();
    table.uuid('tag_id').primary();

    table.foreign('cluster_id').references('id').inTable('cluster_of_tags');
    table.foreign('tag_id').references('id').inTable('tags');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('cluster_of_tags');
  await knex.schema.dropTable('cluster_of_tags_tags');
}
