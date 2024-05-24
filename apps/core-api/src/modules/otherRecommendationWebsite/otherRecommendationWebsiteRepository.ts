import {
  OtherRecommendationWebsite,
  OtherRecommendationWebsiteRowSchema,
} from '@modules/otherRecommendationWebsite/otherRecommendationWebsiteModel';
import knex from '@src/index';

const toModel = (row: OtherRecommendationWebsiteRowSchema): OtherRecommendationWebsite => ({
  id: row.id,
  name: row.name,
  createdAt: new Date(row.created_at),
  updatedAt: new Date(row.updated_at),
  notebookId: row.notebook_id,
  link: row.link,
});

export const otherRecommendationWebsiteRepository = {
  findAllAsync: async (): Promise<OtherRecommendationWebsite[]> => {
    const rows = await knex('others_recommendations_websites').select('*');
    return rows.map(toModel);
  },

  findByIdAsync: async (id: string): Promise<OtherRecommendationWebsite | null> => {
    const row = await knex('others_recommendations_websites').where({ id }).first();

    if (!row) {
      return null;
    }

    return toModel(row);
  },

  create: async (recommendationWebsite: OtherRecommendationWebsite): Promise<OtherRecommendationWebsite> => {
    const [row] = await knex('others_recommendations_websites')
      .insert({
        id: recommendationWebsite.id,
        name: recommendationWebsite.name,
        created_at: recommendationWebsite.createdAt,
        updated_at: recommendationWebsite.updatedAt,
        link: recommendationWebsite.link,
        notebook_id: recommendationWebsite.notebookId,
      })
      .returning('*');

    return toModel(row);
  },

  update: async (recommendationWebsite: OtherRecommendationWebsite): Promise<OtherRecommendationWebsite> => {
    const [row] = await knex('others_recommendations_websites')
      .where({ id: recommendationWebsite.id })
      .update({
        name: recommendationWebsite.name,
        updated_at: recommendationWebsite.updatedAt,
        link: recommendationWebsite.link,
      })
      .returning('*');

    return toModel(row);
  },

  delete: async (id: string): Promise<void> => {
    await knex('others_recommendations_websites').where({ id }).del();
  },
};
