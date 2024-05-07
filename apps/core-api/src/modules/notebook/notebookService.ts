import { StatusCodes } from 'http-status-codes';

import { NotFoundError } from '@common/models/notFoundError';
import { ResponseStatus, ServiceResponse } from '@common/models/serviceResponse';
import { CreateNotebookRequest, GetNotebookByIdResponse, Notebook } from '@modules/notebook/notebookModel';
import { notebookRepository } from '@modules/notebook/notebookRepository';
import { v4 as uuidv4 } from 'uuid';

const toDTO = (notebook: Notebook): GetNotebookByIdResponse => ({
  id: notebook.id,
  name: notebook.name,
  brand: notebook.brand,
  color: notebook.color,
  screen_size: notebook.screen_size,
  screen_resolution: notebook.screen_resolution,
  battery: notebook.battery,
  has_numeric_keypad: notebook.has_numeric_keypad,
  operating_system: notebook.operating_system,
  manufacturer_id: notebook.manufacturer_id,
  weight: notebook.weight,
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
  create: async (request: CreateNotebookRequest): Promise<ServiceResponse<string | null>> => {
    const notebook = await notebookRepository.create({
      id: uuidv4(),
      name: request.name,
      color: request.color ?? '',
      screen_size: request.screen_size ?? '',
      screen_resolution: request.screen_resolution ?? '',
      battery: request.battery ?? '',
      has_numeric_keypad: request.has_numeric_keypad ?? false,
      operating_system: request.operating_system ?? '',
      manufacturer_id: request.manufacturer_id ?? '',
      weight: request.weight ?? '',
      brand: request.brand,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return new ServiceResponse<string>(ResponseStatus.Success, 'Notebook criado', notebook.id, StatusCodes.CREATED);
  },
};
