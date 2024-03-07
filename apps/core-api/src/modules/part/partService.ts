import { StatusCodes } from 'http-status-codes';

import { ResponseStatus, ServiceResponse } from '@common/models/serviceResponse';
import { logger } from '@src/server';
import { v4 as uuidv4 } from 'uuid';

import { CreatePartRequest, GetPartByIdResponse, Part, UpdatePartRequest } from '@modules/part/partModel';
import { partRepository } from '@modules/part/partRepository';

const toDTO = (part: Part): GetPartByIdResponse => ({
  id: part.id,
  partType: part.partType,
  point: part.point,
  name: part.name,
  multiplier: part.multiplier,
  active: part.active,
  createdAt: part.createdAt,
  updatedAt: part.updatedAt,
});

export const partService = {
  findAll: async (): Promise<ServiceResponse<GetPartByIdResponse[] | null>> => {
    try {
      const parts = await partRepository.findAllAsync();
      return new ServiceResponse<GetPartByIdResponse[]>(
        ResponseStatus.Success,
        'Parts encontradas',
        parts.map(toDTO),
        StatusCodes.OK
      );
    } catch (ex) {
      const errorMessage = `Erro ao encontrar as parts: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
  findById: async (id: string): Promise<ServiceResponse<GetPartByIdResponse | null>> => {
    try {
      const part = await partRepository.findByIdAsync(id);
      if (!part) {
        return new ServiceResponse(ResponseStatus.Failed, 'Nenhuma part encontrada', null, StatusCodes.NOT_FOUND);
      }

      return new ServiceResponse<GetPartByIdResponse>(
        ResponseStatus.Success,
        'Part encontrada',
        toDTO(part),
        StatusCodes.OK
      );
    } catch (ex) {
      const errorMessage = `Erro ao encontrar a part: $${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
  createPart: async (request: CreatePartRequest): Promise<ServiceResponse<string | null>> => {
    try {
      if (await partRepository.findByNameAsync(request.name)) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          `Nome ${request.name} já é utilizado por outra part`,
          null,
          StatusCodes.BAD_REQUEST
        );
      }

      const part = await partRepository.createPart({
        active: request.active,
        multiplier: request.multiplier,
        point: request.point,
        id: uuidv4(),
        name: request.name,
        partType: request.partType,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      return new ServiceResponse<string>(ResponseStatus.Success, 'Part criada', part.id, StatusCodes.CREATED);
    } catch (ex) {
      const errorMessage = `Erro ao criar a part: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
  updatePart: async (id: string, request: UpdatePartRequest): Promise<ServiceResponse<string | null>> => {
    try {
      const part = await partRepository.findByIdAsync(id);
      if (!part) {
        return new ServiceResponse(ResponseStatus.Failed, 'Nenhuma part encontrada', null, StatusCodes.NOT_FOUND);
      }

      const partByName = await partRepository.findByNameAsync(request.name);
      if (partByName && partByName.id !== part.id) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          `Nome ${request.name} já é utilizado por outra part`,
          null,
          StatusCodes.BAD_REQUEST
        );
      }

      part.name = request.name;
      part.active = request.active;
      part.multiplier = request.multiplier;
      part.point = request.point;
      part.updatedAt = new Date();

      await partRepository.updatePart(part);

      return new ServiceResponse<string>(ResponseStatus.Success, 'Part alterada', part.id, StatusCodes.OK);
    } catch (ex) {
      const errorMessage = `Erro ao alterar a part: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
  deletePart: async (id: string): Promise<ServiceResponse<string | null>> => {
    try {
      const part = await partRepository.findByIdAsync(id);
      if (!part) {
        return new ServiceResponse(ResponseStatus.Failed, 'Nenhuma part encontrada', null, StatusCodes.NOT_FOUND);
      }

      await partRepository.deletePart(id);

      return new ServiceResponse<string>(ResponseStatus.Success, 'Part deletada', part.id, StatusCodes.OK);
    } catch (ex) {
      const errorMessage = `Erro ao alterar a part: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
};
