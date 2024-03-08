import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('parts', function (table) {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.enum('part_type', ['Processor', 'Ram Memory', 'HD', 'SSD', 'Video Card']).notNullable();
    table.float('point').unsigned().defaultTo(1.0).notNullable();
    table.string('name', 255).notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.check('?? > 0', ['point']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('parts');
}
