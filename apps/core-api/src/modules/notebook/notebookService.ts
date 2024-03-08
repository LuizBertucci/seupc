import { StatusCodes } from 'http-status-codes';

import { ResponseStatus, ServiceResponse } from '@common/models/serviceResponse';
import { GetNotebookByIdResponse, CreateNotebookRequest, Notebook } from '@modules/notebook/notebookModel';
import { notebookRepository } from '@modules/notebook/notebookRepository';
import { logger } from '@src/server';
import { v4 as uuidv4 } from 'uuid';

const toDTO = (notebook: Notebook): GetNotebookByIdResponse => ({
  id: notebook.id,
  title: notebook.title,
  brand: notebook.brand,
  createdAt: notebook.createdAt,
  updatedAt: notebook.updatedAt,
});

export const notebookService = {
  findAll: async (): Promise<ServiceResponse<GetNotebookByIdResponse[] | null>> => {
    try {
      const notebooks = await notebookRepository.findAllAsync();

      if (!notebooks) {
        return new ServiceResponse(ResponseStatus.Failed, 'Nenhum notebook encontrado', null, StatusCodes.NOT_FOUND);
      }

      return new ServiceResponse<GetNotebookByIdResponse[]>(
        ResponseStatus.Success,
        'Notebooks encontrados',
        notebooks.map(toDTO),
        StatusCodes.OK
      );
    } catch (ex) {
      const errorMessage = `Erro ao encontrar os notebooks: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },

  findById: async (id: string): Promise<ServiceResponse<GetNotebookByIdResponse | null>> => {
    try {
      const notebook = await notebookRepository.findByIdAsync(id);
      if (!notebook) {
        return new ServiceResponse(ResponseStatus.Failed, 'Nenhum notebook encontrado', null, StatusCodes.NOT_FOUND);
      }

      return new ServiceResponse<GetNotebookByIdResponse>(
        ResponseStatus.Success,
        'Notebook encontrado',
        toDTO(notebook),
        StatusCodes.OK
      );
    } catch (ex) {
      const errorMessage = `Erro ao obter o notebook com ${id}:, ${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },

  createNotebook: async (request: CreateNotebookRequest): Promise<ServiceResponse<string | null>> => {
    try {
      const notebook = await notebookRepository.createNotebook({
        id: uuidv4(),
        title: request.title,
        brand: request.brand,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      return new ServiceResponse<string>(ResponseStatus.Success, 'Notebook criado', notebook.id, StatusCodes.CREATED);
    } catch (ex) {
      const errorMessage = `Erro ao criar o notebook: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
};
