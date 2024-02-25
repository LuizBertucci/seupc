import { StatusCodes } from 'http-status-codes';

import { ResponseStatus, ServiceResponse } from '@common/models/serviceResponse';
import { GetNotebookByIdResponse } from '@modules/notebook/notebookModel';
import { notebookRepository } from '@modules/notebook/notebookRepository';
import { logger } from '@src/server';

export const notebookService = {
  findAll: async (): Promise<ServiceResponse<GetNotebookByIdResponse[] | null>> => {
    try {
      const notebooks = await notebookRepository.findAllAsync();

      if (!notebooks) {
        return new ServiceResponse(ResponseStatus.Failed, 'Nenhum notebook encontrado', null, StatusCodes.NOT_FOUND);
      }

      const response: GetNotebookByIdResponse[] = notebooks.map((notebook) => ({
        id: notebook.id,
        title: notebook.title,
        createdAt: notebook.createdAt,
        updatedAt: notebook.updatedAt,
      }));

      return new ServiceResponse<GetNotebookByIdResponse[]>(ResponseStatus.Success, 'Notebooks encontrados', response, StatusCodes.OK);
    } catch (ex) {
      const errorMessage = `Erro ao encontrar os notebooks: $${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },

  findById: async (id: number): Promise<ServiceResponse<GetNotebookByIdResponse | null>> => {
    try {
      const notebook = await notebookRepository.findByIdAsync(id);
      if (!notebook) {
        return new ServiceResponse(ResponseStatus.Failed, 'Nenhum notebook encontrado', null, StatusCodes.NOT_FOUND);
      }

      const response: GetNotebookByIdResponse = {
        id: notebook.id,
        title: notebook.title,
        createdAt: notebook.createdAt,
        updatedAt: notebook.updatedAt,
      };

      return new ServiceResponse<GetNotebookByIdResponse>(ResponseStatus.Success, 'Notebook encontrado', response, StatusCodes.OK);
    } catch (ex) {
      const errorMessage = `Erro ao obter o notebook com ${id}:, ${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
};
