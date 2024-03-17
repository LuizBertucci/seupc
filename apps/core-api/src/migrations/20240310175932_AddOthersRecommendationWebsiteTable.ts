import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('others_recommendations_websites', function (table) {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table
      .enum('name', [
        'Zoom',
        'BuscaPé',
        'TecMundo',
        'JáCotei',
        'Bondfaro',
        'Clique Economize',
        'Promobit',
        'Google Shopping',
      ])
      .notNullable();
    table.string('link').notNullable();
    table.uuid('notebook_id').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());

    table.foreign('notebook_id').references('id').inTable('notebooks');
    table.unique(['name', 'notebook_id'], { indexName: 'idx_orw_name_notebook' });
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('others_recommendations_websites');
}
