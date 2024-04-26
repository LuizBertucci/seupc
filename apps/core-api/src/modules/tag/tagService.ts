import { StatusCodes } from 'http-status-codes';

import { ResponseStatus, ServiceResponse } from '@common/models/serviceResponse';
import { v4 as uuidv4 } from 'uuid';
import { CreateTagRequest, GetTagByIdResponse, Tag, TagPartTuple, UpdateTagRequest } from '@modules/tag/tagModel';
import { tagRepository } from '@modules/tag/tagRepository';
import { partService } from '@modules/part/partService';
import { BatchNotFoundError, NotFoundError } from '@common/models/notFoundError';

const toDTO = (tag: Tag): GetTagByIdResponse => ({
  id: tag.id,
  category: tag.category,
  name: tag.name,
  createdAt: tag.createdAt,
  updatedAt: tag.updatedAt,
});

export const tagService = {
  findAll: async (): Promise<ServiceResponse<GetTagByIdResponse[] | null>> => {
    const tags = await tagRepository.findAllAsync();
    return new ServiceResponse<GetTagByIdResponse[]>(
      ResponseStatus.Success,
      'Tags encontradas',
      tags.map(toDTO),
      StatusCodes.OK
    );
  },
  findById: async (id: string): Promise<ServiceResponse<GetTagByIdResponse | null>> => {
    const tag = await tagRepository.findByIdAsync(id);
    if (!tag) {
      throw new NotFoundError(id);
    }

    return new ServiceResponse<GetTagByIdResponse>(
      ResponseStatus.Success,
      'Tag encontrada',
      toDTO(tag),
      StatusCodes.OK
    );
  },
  create: async (request: CreateTagRequest): Promise<ServiceResponse<string | null>> => {
    const tag = await tagRepository.create({
      id: uuidv4(),
      name: request.name,
      category: request.category,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return new ServiceResponse<string>(ResponseStatus.Success, 'Tag criada', tag.id, StatusCodes.CREATED);
  },
  update: async (id: string, request: UpdateTagRequest): Promise<ServiceResponse<string | null>> => {
    const tag = await tagRepository.findByIdAsync(id);
    if (!tag) {
      throw new NotFoundError(id);
    }

    tag.name = request.name;
    tag.updatedAt = new Date();

    await tagRepository.update(tag);

    return new ServiceResponse<string>(ResponseStatus.Success, 'Tag alterada', tag.id, StatusCodes.OK);
  },
  delete: async (id: string): Promise<ServiceResponse<string | null>> => {
    const tag = await tagRepository.findByIdAsync(id);
    if (!tag) {
      throw new NotFoundError(id);
    }

    await tagRepository.delete(id);

    return new ServiceResponse<string>(ResponseStatus.Success, 'Tag deletada', tag.id, StatusCodes.OK);
  },
  addParts: async (data: TagPartTuple[]): Promise<ServiceResponse<string | null>> => {
    const tags = await tagRepository.findByIdsAsync(data.map(({ tagId }) => tagId));
    if (tags.length !== data.length) {
      throw new BatchNotFoundError();
    }
    const parts = await partService.findByIds(data.map(({ partId }) => partId));
    if (parts.success && parts.responseObject?.length !== data.length) {
      throw new BatchNotFoundError();
    }

    await tagRepository.addParts(data);

    return new ServiceResponse<string>(
      ResponseStatus.Success,
      'Tags associadas a parts',
      data.toString(),
      StatusCodes.OK
    );
  },
};
