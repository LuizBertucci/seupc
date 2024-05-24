import { StatusCodes } from 'http-status-codes';

import { BatchNotFoundError, NotFoundError } from '@common/models/notFoundError';
import { ResponseStatus, ServiceResponse } from '@common/models/serviceResponse';
import { partService } from '@modules/part/partService';
import { CreateTagRequest, GetTagByIdResponse, Tag, TagPartTuple, UpdateTagRequest } from '@modules/tag/tagModel';
import { tagRepository } from '@modules/tag/tagRepository';
import { v4 as uuidv4 } from 'uuid';

const toDTO = (tag: Tag): GetTagByIdResponse => ({
  id: tag.id,
  category: tag.category,
  name: tag.name,
  createdAt: tag.createdAt,
  updatedAt: tag.updatedAt,
  parts: tag.parts ?? [],
});

export const tagService = {
  getAll: async (): Promise<ServiceResponse<GetTagByIdResponse[] | null>> => {
    const tags = await tagRepository.findAllAsync();
    return new ServiceResponse<GetTagByIdResponse[]>(
      ResponseStatus.Success,
      'Tags encontradas',
      tags.map(toDTO),
      StatusCodes.OK
    );
  },
  get: async (id: string): Promise<ServiceResponse<GetTagByIdResponse | null>> => {
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
  create: async (request: CreateTagRequest): Promise<ServiceResponse<string>> => {
    const partsIds = request.partsIds;
    if (partsIds?.length) {
      const { responseObject: parts } = await partService.findByIds(partsIds);
      if (parts.length !== partsIds.length) {
        throw new BatchNotFoundError();
      }
    }

    const tag = await tagRepository.create(
      {
        id: uuidv4(),
        name: request.name,
        category: request.category,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      partsIds
    );

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
  addParts: async (data: TagPartTuple[]): Promise<ServiceResponse<TagPartTuple[]>> => {
    const tagsIds = data.map(({ tagId }) => tagId);
    const tags = await tagRepository.batchGet(tagsIds);
    if (tags.length !== new Set(tagsIds).size) {
      throw new BatchNotFoundError();
    }
    const partsIds = data.map(({ partId }) => partId);
    const parts = await partService.findByIds(partsIds);
    if (parts.success && parts.responseObject?.length !== new Set(partsIds).size) {
      throw new BatchNotFoundError();
    }

    await tagRepository.addParts(data);

    return new ServiceResponse<TagPartTuple[]>(ResponseStatus.Success, 'Tags associadas a parts', data, StatusCodes.OK);
  },
  getTagsByClusterId: async (clusterId: string): Promise<ServiceResponse<GetTagByIdResponse[]>> => {
    const tags = await tagRepository.getTagsByClusterId(clusterId);
    return new ServiceResponse<GetTagByIdResponse[]>(
      ResponseStatus.Success,
      'Tags associadas a clusters',
      tags.map(toDTO),
      StatusCodes.OK
    );
  },
  batchGet: async (ids: string[]): Promise<ServiceResponse<GetTagByIdResponse[]>> => {
    const tags = await tagRepository.batchGet(ids);
    return new ServiceResponse<GetTagByIdResponse[]>(
      ResponseStatus.Success,
      'Tags encontradas',
      tags.map(toDTO),
      StatusCodes.OK
    );
  },
};
