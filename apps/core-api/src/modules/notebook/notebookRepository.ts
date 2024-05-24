import { Notebook, NotebookPartTuple, NotebookRowSchema } from '@modules/notebook/notebookModel';
import { ORWName } from '@modules/otherRecommendationWebsite/otherRecommendationWebsiteModel';
import knex from '@src/index';

const toModel = (row: NotebookRowSchema): Notebook => ({
  id: row.id,
  name: row.name,
  brand: row.brand,
  color: row.color ?? '',
  screen_size: row.screen_size ?? '',
  screen_resolution: row.screen_resolution ?? '',
  battery: row.battery ?? '',
  has_numeric_keypad: row.has_numeric_keypad ?? false,
  has_stock: row.has_stock,
  published: row.published,
  operating_system: row.operating_system ?? '',
  manufacturer_id: row.manufacturer_id ?? '',
  weight: row.weight ?? '',
  createdAt: new Date(row.created_at),
  updatedAt: new Date(row.updated_at),
});

const getWebsiteNameFromLink = (link: string): string => {
  const patterns = {
    [ORWName.ZOOM]: /zoom/i,
    [ORWName.BUSCAPE]: /buscape/i,
    [ORWName.TEC_MUNDO]: /tecmundo/i,
    [ORWName.JA_COTEI]: /jacotei/i,
    [ORWName.BONDFARO]: /bondfaro/i,
    [ORWName.CLIQUE_E_CONOMIZE]: /cliqueeconomize/i,
    [ORWName.PROMOBIT]: /promobit/i,
    [ORWName.GOOGLE_SHOPPING]: /google(?:shopping)?/i,
  };

  for (const [name, pattern] of Object.entries(patterns)) {
    if (pattern.test(link)) {
      return name;
    }
  }

  return 'Unknown';
};

export const notebookRepository = {
  findAllAsync: async (): Promise<Notebook[]> => {
    const rows = await knex('notebooks').select('*');

    return rows.map(toModel);
  },

  findByIdAsync: async (id: string): Promise<Notebook | null> => {
    const row = await knex('notebooks').select('*').where('id', id).first();

    if (!row) {
      return null;
    }

    return toModel(row);
  },

  create: async (notebook: Notebook, recommendationLink: string, partsIds?: string[]): Promise<Notebook> => {
    try {
      return knex.transaction(async (trx) => {
        const [newNotebook] = await trx('notebooks')
          .insert({
            id: notebook.id,
            name: notebook.name,
            brand: notebook.brand,
            color: notebook.color,
            screen_size: notebook.screen_size,
            screen_resolution: notebook.screen_resolution,
            battery: notebook.battery,
            has_numeric_keypad: notebook.has_numeric_keypad,
            has_stock: notebook.has_stock,
            published: notebook.published,
            operating_system: notebook.operating_system,
            manufacturer_id: notebook.manufacturer_id,
            weight: notebook.weight,
            created_at: notebook.createdAt,
            updated_at: notebook.updatedAt,
          })
          .returning('*');

        const name = getWebsiteNameFromLink(recommendationLink);

        if (notebook.id) {
          const data = {
            name,
            link: recommendationLink,
            notebook_id: notebook.id,
          };
          await trx('others_recommendations_websites').insert(data);
        }

        if (partsIds?.length) {
          const partsData = partsIds.map((partId) => ({
            notebook_id: notebook.id,
            part_id: partId,
          }));
          await trx('notebook_parts').insert(partsData);
        }

        return newNotebook;
      });
    } catch (error) {
      throw error;
    }
  },

  addParts: async (data: NotebookPartTuple[]): Promise<void> => {
    if (!data.length) {
      return;
    }

    const partsData = data.map(({ notebookId, partId }) => ({
      notebook_id: notebookId,
      part_id: partId,
    }));

    await knex('notebook_parts').insert(partsData).onConflict().ignore();
  },

  findByIdsAsync: async (ids: string[]): Promise<Notebook[]> => {
    if (!ids.length) {
      return [];
    }

    const notebooks = await knex('notebooks').select('*').whereIn('id', ids);

    return notebooks.map(toModel);
  },
};
