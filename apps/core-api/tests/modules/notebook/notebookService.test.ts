import { StatusCodes } from 'http-status-codes';

import { Notebook } from '@modules/notebook/notebookModel';
import { notebookRepository } from '@modules/notebook/notebookRepository';
import { notebookService } from '@modules/notebook/notebookService';

jest.mock('@modules/notebook/notebookRepository');

describe('notebookService', () => {
  const mockNotebooks: Notebook[] = [
    { id: 1, title: 'Notebook 1', createdAt: new Date(), updatedAt: new Date() },
    { id: 2, title: 'Notebook 2', createdAt: new Date(), updatedAt: new Date() },
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

    it('returns a not found error for no notebook found', async () => {
      // Arrange
      (notebookRepository.findAllAsync as jest.Mock).mockReturnValue(null);

      // Act
      const result = await notebookService.findAll();

      // Assert
      expect(result.statusCode).toEqual(StatusCodes.NOT_FOUND);
      expect(result.success).toBeFalsy();
      expect(result.message).toContain('Nenhum notebook encontrado');
      expect(result.responseObject).toEqual(null);
    });

    it('handles errors for findAllAsync', async () => {
      // Arrange
      (notebookRepository.findAllAsync as jest.Mock).mockRejectedValue(new Error('Database error'));

      // Act
      const result = await notebookService.findAll();

      // Assert
      expect(result.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(result.success).toBeFalsy();
      expect(result.message).toContain('Erro ao encontrar os notebooks');
      expect(result.responseObject).toEqual(null);
    });
  });
});
