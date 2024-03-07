import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('parts', function (table) {
    table.increments('id').primary();
    table.enum('part_type', ['CPU', 'MEMORY', 'HD', 'SSD', 'GPU']).notNullable();
    table.float('point').defaultTo(1.0).notNullable();
    table.string('name', 255).notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('parts');
}
