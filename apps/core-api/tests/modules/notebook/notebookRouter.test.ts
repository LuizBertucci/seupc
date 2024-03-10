import { StatusCodes } from 'http-status-codes';
import request from 'supertest';

import { ServiceResponse } from '@common/models/serviceResponse';
import { Notebook } from '@modules/notebook/notebookModel';
import { app } from '@src/server';
import knex from '@src/index';

describe('Notebook API Endpoints', () => {
  afterAll(() => knex.destroy());

  describe('GET /notebooks', () => {
    it('should return a list of notebooks', async () => {
      const response = await request(app).get('/notebooks');
      const responseBody: ServiceResponse<Notebook[]> = response.body;
      expect(response.statusCode).toEqual(StatusCodes.OK);
      expect(responseBody.success).toBeTruthy();
      expect(responseBody.message).toContain('Notebooks encontrados');
    });
  });
});
