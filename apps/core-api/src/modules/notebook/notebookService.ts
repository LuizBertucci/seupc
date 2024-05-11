import { StatusCodes } from 'http-status-codes';

import { BatchNotFoundError, NotFoundError } from '@common/models/notFoundError';
import { ResponseStatus, ServiceResponse } from '@common/models/serviceResponse';
import {
  CreateNotebookRequest,
  GetNotebookByIdResponse,
  Notebook,
  NotebookPartTuple,
} from '@modules/notebook/notebookModel';
import { notebookRepository } from '@modules/notebook/notebookRepository';
import { partService } from '@modules/part/partService';
import { v4 as uuidv4 } from 'uuid';

const createServiceResponse = (responseStatus: ResponseStatus, message: string, data: any, statusCode: StatusCodes) => {
  return new ServiceResponse(responseStatus, message, data, statusCode);
};

const toDTO = (notebook: Notebook): GetNotebookByIdResponse => ({
  id: notebook.id,
  name: notebook.name,
  brand: notebook.brand,
  color: notebook.color,
  screen_size: notebook.screen_size,
  screen_resolution: notebook.screen_resolution,
  battery: notebook.battery,
  has_numeric_keypad: notebook.has_numeric_keypad,
  has_stock: notebook.has_stock,
  published: notebook.published,
  operating_system: notebook.operating_system,
  manufacturer_id: notebook.manufacturer_id,
  weight: notebook.weight,
  createdAt: notebook.createdAt,
  updatedAt: notebook.updatedAt,
});

export const notebookService = {
  findAll: async (): Promise<ServiceResponse<GetNotebookByIdResponse[] | null>> => {
    const notebooks = await notebookRepository.findAllAsync();
    return createServiceResponse(ResponseStatus.Success, 'Notebooks encontrados', notebooks.map(toDTO), StatusCodes.OK);
  },

  findById: async (id: string): Promise<ServiceResponse<GetNotebookByIdResponse | null>> => {
    const notebook = await notebookRepository.findByIdAsync(id);
    if (!notebook) {
      throw new NotFoundError(id);
    }
    return createServiceResponse(ResponseStatus.Success, 'Notebook encontrado', toDTO(notebook), StatusCodes.OK);
  },

  create: async (request: CreateNotebookRequest): Promise<ServiceResponse<string | null>> => {
    const {
      name,
      brand,
      color = '',
      screen_size = '',
      screen_resolution = '',
      battery = '',
      has_numeric_keypad = false,
      has_stock = false,
      published = true,
      operating_system = '',
      manufacturer_id = '',
      weight = '',
    } = request;

    const notebook = await notebookRepository.create({
      id: uuidv4(),
      name,
      brand,
      color,
      screen_size,
      screen_resolution,
      battery,
      has_numeric_keypad,
      has_stock,
      published,
      operating_system,
      manufacturer_id,
      weight,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return createServiceResponse(ResponseStatus.Success, 'Notebook criado', notebook.id, StatusCodes.CREATED);
  },

  addParts: async (data: NotebookPartTuple[]): Promise<ServiceResponse<NotebookPartTuple[]>> => {
    const notebooks = await notebookRepository.findByIdsAsync(data.map((item) => item.notebookId));
    if (notebooks.length !== data.length) {
      throw new BatchNotFoundError();
    }

    const parts = await partService.findByIds(data.map(({ partId }) => partId));
    if (parts.success && parts.responseObject?.length !== data.length) {
      throw new BatchNotFoundError();
    }

    await notebookRepository.addParts(data);

    return new ServiceResponse<NotebookPartTuple[]>(
      ResponseStatus.Success,
      'Notebooks associadas a parts',
      data,
      StatusCodes.OK
    );
  },
};
