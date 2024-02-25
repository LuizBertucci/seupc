import { StatusCodes } from 'http-status-codes';
import request from 'supertest';

import { ServiceResponse } from '@common/models/serviceResponse';
import { Notebook } from '@modules/notebook/notebookModel';
import { notebooks } from '@modules/notebook/notebookRepository';
import { app } from '@src/server';

describe('Notebook API Endpoints', () => {
  describe('GET /notebooks', () => {
    it('should return a list of notebooks', async () => {
      // Act
      const response = await request(app).get('/notebooks');
      const responseBody: ServiceResponse<Notebook[]> = response.body;

      // Assert
      expect(response.statusCode).toEqual(StatusCodes.OK);
      expect(responseBody.success).toBeTruthy();
      expect(responseBody.message).toContain('Notebooks encontrados');
      expect(responseBody.responseObject.length).toEqual(notebooks.length);
      responseBody.responseObject.forEach((notebook, index) => compareNotebooks(notebooks[index] as Notebook, notebook));
    });
  });

});

function compareNotebooks(mockNotebook: Notebook, responseNotebook: Notebook) {
  if (!mockNotebook || !responseNotebook) {
    fail('Invalid test data: mockNotebook or responseNotebook is undefined');
  }

  expect(responseNotebook.id).toEqual(mockNotebook.id);
  expect(responseNotebook.title).toEqual(mockNotebook.title);
  expect(new Date(responseNotebook.createdAt)).toEqual(mockNotebook.createdAt);
  expect(new Date(responseNotebook.updatedAt)).toEqual(mockNotebook.updatedAt);
}
