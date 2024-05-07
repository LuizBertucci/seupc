import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.table('notebooks', (table) => {
    table.renameColumn('title', 'name');
    table.string('color').nullable();
    table.string('screen_size').nullable();
    table.string('screen_resolution').nullable();
    table.string('battery').nullable();
    table.boolean('has_numeric_keypad').defaultTo(false);
    table.string('operating_system').nullable();
    table.string('manufacturer_id').nullable();
    table.string('weight').nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table('notebooks', (table) => {
    table.renameColumn('name', 'title');
    table.dropColumn('color');
    table.dropColumn('screen_size');
    table.dropColumn('screen_resolution');
    table.dropColumn('battery');
    table.dropColumn('has_numeric_keypad');
    table.dropColumn('operating_system');
    table.dropColumn('manufacturer_id');
    table.dropColumn('weight');
  });
}
