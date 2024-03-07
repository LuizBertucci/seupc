import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('parts', function(table) {
    table.increments('id').primary();
    table.string('part_type', 255);
    table.float('point').defaultTo(1.0);
    table.string('name', 255);
    table.float('multiplier').defaultTo(1.0);
    table.boolean('active').defaultTo(true);
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('parts');
}
