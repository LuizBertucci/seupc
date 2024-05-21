import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.dropTable('cluster_of_tags_tags');
  await knex.schema.createTable('cluster_of_tags_tags', function (table) {
    table.uuid('cluster_id').primary();
    table.uuid('tag_id').primary();

    table.primary(['cluster_id', 'tag_id']);

    table.foreign('cluster_id').references('id').inTable('cluster_of_tags');
    table.foreign('tag_id').references('id').inTable('tags');

    table.index(['cluster_id']);
    table.index(['tag_id']);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('cluster_of_tags_tags');
  await knex.schema.createTable('cluster_of_tags_tags', function (table) {
    table.uuid('cluster_id').primary();
    table.uuid('tag_id').primary();

    table.foreign('cluster_id').references('id').inTable('cluster_of_tags');
    table.foreign('tag_id').references('id').inTable('tags');
  });
}
