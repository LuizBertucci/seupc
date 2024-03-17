import { StatusCodes } from 'http-status-codes';

import { Brand, Notebook } from '@modules/notebook/notebookModel';
import { notebookRepository } from '@modules/notebook/notebookRepository';
import { notebookService } from '@modules/notebook/notebookService';
import { randomUUID } from 'crypto';

jest.mock('@modules/notebook/notebookRepository');
jest.mock('@src/index');
jest.mock('@src/server');

describe('notebookService', () => {
  const mockNotebooks: Notebook[] = [
    { id: randomUUID(), title: 'Notebook 1', createdAt: new Date(), updatedAt: new Date(), brand: Brand.ACER },
    { id: randomUUID(), title: 'Notebook 2', createdAt: new Date(), updatedAt: new Date(), brand: Brand.ALIENWARE },
  ];

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('findAll', () => {
    it('return all notebooks', async () => {
      // Arrange
      (notebookRepository.findAllAsync as jest.Mock).mockReturnValue(mockNotebooks);

      // Act
      const result = await notebookService.findAll();

      // Assert
      expect(result.statusCode).toEqual(StatusCodes.OK);
      expect(result.success).toBeTruthy();
      expect(result.message).toContain('Notebooks encontrados');
      expect(result.responseObject).toEqual(mockNotebooks);
    });
  });
});
