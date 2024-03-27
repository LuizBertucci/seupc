import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('tags', function (table) {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.enum('category', ['Games', 'Programs', 'Courses']).notNullable();
    table.string('name', 255).notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });

  await knex.schema.createTable('tag_parts', function (table) {
    table.uuid('part_id').primary();
    table.uuid('tag_id').primary();

    table.foreign('part_id').references('id').inTable('parts');
    table.foreign('tag_id').references('id').inTable('tags');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('tags');
  await knex.schema.dropTable('tag_parts');
}
