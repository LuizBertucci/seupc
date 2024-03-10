import { StatusCodes } from 'http-status-codes';

import { ResponseStatus, ServiceResponse } from '@common/models/serviceResponse';
import { logger } from '@src/server';
import { v4 as uuidv4 } from 'uuid';
import { CreateTagRequest, GetTagByIdResponse, Tag, UpdateTagRequest } from '@modules/tag/tagModel';
import { tagRepository } from '@modules/tag/tagRepository';


const toDTO = (tag: Tag): GetTagByIdResponse => ({
  id: tag.id,
  category: tag.category,
  name: tag.name,
  createdAt: tag.createdAt,
  updatedAt: tag.updatedAt,
});

export const tagService = {
  findAll: async (): Promise<ServiceResponse<GetTagByIdResponse[] | null>> => {
    try {
      const tags = await tagRepository.findAllAsync();
      return new ServiceResponse<GetTagByIdResponse[]>(
        ResponseStatus.Success,
        'Tags encontradas',
        tags.map(toDTO),
        StatusCodes.OK
      );
    } catch (ex) {
      const errorMessage = `Erro ao encontrar as tags: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
  findById: async (id: string): Promise<ServiceResponse<GetTagByIdResponse | null>> => {
    try {
      const tag = await tagRepository.findByIdAsync(id);
      if (!tag) {
        return new ServiceResponse(ResponseStatus.Failed, 'Nenhuma tag encontrada', null, StatusCodes.NOT_FOUND);
      }

      return new ServiceResponse<GetTagByIdResponse>(
        ResponseStatus.Success,
        'Tag encontrada',
        toDTO(tag),
        StatusCodes.OK
      );
    } catch (ex) {
      const errorMessage = `Erro ao encontrar a tag: $${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
  create: async (request: CreateTagRequest): Promise<ServiceResponse<string | null>> => {
    try {

      const tag = await tagRepository.create({
        id: uuidv4(),
        name: request.name,
        category: request.category,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      return new ServiceResponse<string>(ResponseStatus.Success, 'Tag criada', tag.id, StatusCodes.CREATED);
    } catch (ex) {
      const errorMessage = `Erro ao criar a tag: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
  update: async (id: string, request: UpdateTagRequest): Promise<ServiceResponse<string | null>> => {
    try {
      const tag = await tagRepository.findByIdAsync(id);
      if (!tag) {
        return new ServiceResponse(ResponseStatus.Failed, 'Nenhuma tag encontrada', null, StatusCodes.NOT_FOUND);
      }

      tag.name = request.name;
      tag.updatedAt = new Date();

      await tagRepository.update(tag);

      return new ServiceResponse<string>(ResponseStatus.Success, 'Tag alterada', tag.id, StatusCodes.OK);
    } catch (ex) {
      const errorMessage = `Erro ao alterar a tag: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
  delete: async (id: string): Promise<ServiceResponse<string | null>> => {
    try {
      const tag = await tagRepository.findByIdAsync(id);
      if (!tag) {
        return new ServiceResponse(ResponseStatus.Failed, 'Nenhuma tag encontrada', null, StatusCodes.NOT_FOUND);
      }

      await tagRepository.delete(id);

      return new ServiceResponse<string>(ResponseStatus.Success, 'Tag deletada', tag.id, StatusCodes.OK);
    } catch (ex) {
      const errorMessage = `Erro ao alterar a tag: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
};
