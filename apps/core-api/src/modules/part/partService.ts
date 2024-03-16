import { StatusCodes } from 'http-status-codes';

import { ResponseStatus, ServiceResponse } from '@common/models/serviceResponse';
import { v4 as uuidv4 } from 'uuid';

import { CreatePartRequest, GetPartByIdResponse, Part, UpdatePartRequest } from '@modules/part/partModel';
import { partRepository } from '@modules/part/partRepository';
import { NotFoundError } from '@common/models/notFoundError';
import { BusinessRuleError } from '@common/models/businessRuleError';

const toDTO = (part: Part): GetPartByIdResponse => ({
  id: part.id,
  partType: part.partType,
  point: part.point,
  name: part.name,
  createdAt: part.createdAt,
  updatedAt: part.updatedAt,
});

export const partService = {
  findAll: async (): Promise<ServiceResponse<GetPartByIdResponse[]>> => {
    const parts = await partRepository.findAllAsync();
    return new ServiceResponse<GetPartByIdResponse[]>(
      ResponseStatus.Success,
      'Parts encontradas',
      parts.map(toDTO),
      StatusCodes.OK
    );
  },
  findById: async (id: string): Promise<ServiceResponse<GetPartByIdResponse>> => {
    const part = await partRepository.findByIdAsync(id);
    if (!part) {
      throw new NotFoundError(id);
    }

    return new ServiceResponse<GetPartByIdResponse>(
      ResponseStatus.Success,
      'Part encontrada',
      toDTO(part),
      StatusCodes.OK
    );
  },
  createPart: async (request: CreatePartRequest): Promise<ServiceResponse<string>> => {
    if (await partRepository.findByNameAsync(request.name)) {
      throw new BusinessRuleError(`Nome ${request.name} já é utilizado por outra part`);
    }

    const part = await partRepository.createPart({
      point: request.point,
      id: uuidv4(),
      name: request.name,
      partType: request.partType,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return new ServiceResponse<string>(ResponseStatus.Success, 'Part criada', part.id, StatusCodes.CREATED);
  },
  updatePart: async (id: string, request: UpdatePartRequest): Promise<ServiceResponse<string>> => {
    const part = await partRepository.findByIdAsync(id);
    if (!part) {
      throw new NotFoundError(id);
    }

    const partByName = await partRepository.findByNameAsync(request.name);
    if (partByName && partByName.id !== part.id) {
      throw new BusinessRuleError(`Nome ${request.name} já é utilizado por outra part`);
    }

    part.name = request.name;
    part.point = request.point;
    part.updatedAt = new Date();

    await partRepository.updatePart(part);

    return new ServiceResponse<string>(ResponseStatus.Success, 'Part alterada', part.id, StatusCodes.OK);
  },
  deletePart: async (id: string): Promise<ServiceResponse<string>> => {
    const part = await partRepository.findByIdAsync(id);
    if (!part) {
      throw new NotFoundError(id);
    }

    await partRepository.deletePart(id);

    return new ServiceResponse<string>(ResponseStatus.Success, 'Part deletada', part.id, StatusCodes.OK);
  },
};
