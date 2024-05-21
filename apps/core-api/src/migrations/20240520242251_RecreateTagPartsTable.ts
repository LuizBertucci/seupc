import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.dropTable('tag_parts');
  await knex.schema.createTable('tag_parts', function (table) {
    table.uuid('part_id');
    table.uuid('tag_id');

    table.primary(['part_id', 'tag_id']);

    table.foreign('part_id').references('id').inTable('parts');
    table.foreign('tag_id').references('id').inTable('tags');

    table.index(['part_id']);
    table.index(['tag_id']);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('tag_parts');
  await knex.schema.createTable('tag_parts', function (table) {
    table.uuid('part_id');
    table.uuid('tag_id');

    table.primary(['part_id']);

    table.foreign('part_id').references('id').inTable('parts');
    table.foreign('tag_id').references('id').inTable('tags');
  });
}
