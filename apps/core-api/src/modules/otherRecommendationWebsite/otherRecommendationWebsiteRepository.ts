import knex from '@src/index';
import {
  OtherRecommendationWebsite,
  OtherRecommendationWebsiteRowSchema,
} from '@modules/otherRecommendationWebsite/otherRecommendationWebsiteModel';

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
    const { rows } = await knex.raw('SELECT orw.* FROM others_recommendations_websites orw');

    return rows.map(toModel);
  },
  findByIdAsync: async (id: string): Promise<OtherRecommendationWebsite | null> => {
    const { rows } = await knex.raw('SELECT orw.* FROM others_recommendations_websites orw WHERE orw.id = ?', [id]);

    if (rows.length === 0) {
      return null;
    }

    return toModel(rows[0]);
  },
  create: async (recommendationWebsite: OtherRecommendationWebsite): Promise<OtherRecommendationWebsite> => {
    const { rows } = await knex.raw(
      'INSERT INTO others_recommendations_websites (id, name, created_at, updated_at, link, notebook_id) VALUES (?, ?, ?, ?, ?, ?) RETURNING *',
      [
        recommendationWebsite.id,
        recommendationWebsite.name,
        recommendationWebsite.createdAt,
        recommendationWebsite.updatedAt,
        recommendationWebsite.link,
        recommendationWebsite.notebookId,
      ]
    );

    return toModel(rows);
  },
  update: async (recommendationWebsite: OtherRecommendationWebsite): Promise<OtherRecommendationWebsite> => {
    const { rows } = await knex.raw('UPDATE others_recommendations_websites SET name = ?, updated_at =?, link =? WHERE id =? RETURNING *', [
      recommendationWebsite.name,
      recommendationWebsite.updatedAt,
      recommendationWebsite.link,
      recommendationWebsite.id,
    ]);

    return toModel(rows);
  },
  delete: async (id: string): Promise<void> => {
    await knex.raw('DELETE FROM others_recommendations_websites orw WHERE orw.id = ?', [id]);
  },
};
