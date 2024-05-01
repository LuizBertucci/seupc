import { StatusCodes } from 'http-status-codes';

import { ResponseStatus, ServiceResponse } from '@common/models/serviceResponse';
import { v4 as uuidv4 } from 'uuid';

import {
  CreateOtherRecommendationWebsiteRequest,
  GetOtherRecommendationWebsiteByIdResponse,
  OtherRecommendationWebsite,
  UpdateOtherRecommendationWebsiteRequest,
} from '@modules/otherRecommendationWebsite/otherRecommendationWebsiteModel';
import { otherRecommendationWebsiteRepository } from '@modules/otherRecommendationWebsite/otherRecommendationWebsiteRepository';
import { notebookService } from '@modules/notebook/notebookService';
import { NotFoundError } from '@common/models/notFoundError';

const toDTO = (website: OtherRecommendationWebsite): GetOtherRecommendationWebsiteByIdResponse => ({
  id: website.id,
  link: website.link,
  notebookId: website.notebookId,
  name: website.name,
  createdAt: website.createdAt,
  updatedAt: website.updatedAt,
});

export const otherRecommendationWebsiteService = {
  findAll: async (): Promise<ServiceResponse<GetOtherRecommendationWebsiteByIdResponse[] | null>> => {
    const website = await otherRecommendationWebsiteRepository.findAllAsync();
    return new ServiceResponse<GetOtherRecommendationWebsiteByIdResponse[]>(
      ResponseStatus.Success,
      'ORWs encontrados',
      website.map(toDTO),
      StatusCodes.OK
    );
  },
  findById: async (id: string): Promise<ServiceResponse<GetOtherRecommendationWebsiteByIdResponse | null>> => {
    const website = await otherRecommendationWebsiteRepository.findByIdAsync(id);
    if (!website) {
      throw new NotFoundError(id);
    }

    return new ServiceResponse<GetOtherRecommendationWebsiteByIdResponse>(
      ResponseStatus.Success,
      'ORW encontrado',
      toDTO(website),
      StatusCodes.OK
    );
  },
  create: async (request: CreateOtherRecommendationWebsiteRequest): Promise<ServiceResponse<string | null>> => {
    await notebookService.findById(request.notebookId);
    const website = await otherRecommendationWebsiteRepository.create({
      link: request.link,
      id: uuidv4(),
      name: request.name,
      notebookId: request.notebookId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return new ServiceResponse<string>(ResponseStatus.Success, 'ORW criado', website.id, StatusCodes.CREATED);
  },
  update: async (
    id: string,
    request: UpdateOtherRecommendationWebsiteRequest
  ): Promise<ServiceResponse<string | null>> => {
    const website = await otherRecommendationWebsiteRepository.findByIdAsync(id);
    if (!website) {
      throw new NotFoundError(id);
    }

    website.name = request.name;
    website.link = request.link;
    website.updatedAt = new Date();

    await otherRecommendationWebsiteRepository.update(website);

    return new ServiceResponse<string>(ResponseStatus.Success, 'ORW alterado', website.id, StatusCodes.OK);
  },
  delete: async (id: string): Promise<ServiceResponse<string>> => {
    const website = await otherRecommendationWebsiteRepository.findByIdAsync(id);
    if (!website) {
      throw new NotFoundError(id);
    }

    await otherRecommendationWebsiteRepository.delete(id);

    return new ServiceResponse<string>(ResponseStatus.Success, 'ORW deletado', website.id, StatusCodes.OK);
  },
};
