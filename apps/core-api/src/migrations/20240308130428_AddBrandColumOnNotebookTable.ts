import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('notebooks', (table) => {
    table
      .enum('brand', [
        'Acer',
        'Apple',
        'Alienware',
        'Asus',
        'Avell',
        'CCE',
        'Compaq',
        'Dell',
        'EVOO',
        'Gigabyte',
        'Huawei',
        'HP',
        'IBM',
        'Itautec',
        'LG',
        'Lenovo',
        'MSI',
        'Multilaser',
        'NeoPC',
        'Philco',
        'Positivo',
        'Samsung',
        'Semp Toshiba',
        'Vaio',
        'Xiaomi',
      ])
      .notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('notebooks', (table) => {
    table.dropColumns('brand');
  });
}
