import { StatusCodes } from 'http-status-codes';

import { ResponseStatus, ServiceResponse } from '@common/models/serviceResponse';
import { GetNotebookByIdResponse, CreateNotebookRequest, Notebook } from '@modules/notebook/notebookModel';
import { notebookRepository } from '@modules/notebook/notebookRepository';
import { v4 as uuidv4 } from 'uuid';
import { NotFoundError } from '@common/models/notFoundError';

const toDTO = (notebook: Notebook): GetNotebookByIdResponse => ({
  id: notebook.id,
  title: notebook.title,
  brand: notebook.brand,
  createdAt: notebook.createdAt,
  updatedAt: notebook.updatedAt,
});

export const notebookService = {
  findAll: async (): Promise<ServiceResponse<GetNotebookByIdResponse[] | null>> => {
    const notebooks = await notebookRepository.findAllAsync();
    return new ServiceResponse<GetNotebookByIdResponse[]>(
      ResponseStatus.Success,
      'Notebooks encontrados',
      notebooks.map(toDTO),
      StatusCodes.OK
    );
  },
  findById: async (id: string): Promise<ServiceResponse<GetNotebookByIdResponse | null>> => {
    const notebook: Notebook | null = await notebookRepository.findByIdAsync(id);
    if (!notebook) {
      throw new NotFoundError(id);
    }
    return new ServiceResponse<GetNotebookByIdResponse>(
      ResponseStatus.Success,
      'Notebook encontrado',
      toDTO(notebook),
      StatusCodes.OK
    );
  },
  createNotebook: async (request: CreateNotebookRequest): Promise<ServiceResponse<string | null>> => {
    const notebook = await notebookRepository.createNotebook({
      id: uuidv4(),
      title: request.title,
      brand: request.brand,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return new ServiceResponse<string>(ResponseStatus.Success, 'Notebook criado', notebook.id, StatusCodes.CREATED);
  },
};
