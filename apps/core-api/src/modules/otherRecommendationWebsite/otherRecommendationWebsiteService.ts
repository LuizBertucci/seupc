import { StatusCodes } from 'http-status-codes';

import { ResponseStatus, ServiceResponse } from '@common/models/serviceResponse';
import { logger } from '@src/server';
import { v4 as uuidv4 } from 'uuid';

import {
  CreateOtherRecommendationWebsiteRequest,
  GetOtherRecommendationWebsiteByIdResponse,
  OtherRecommendationWebsite,
  UpdateOtherRecommendationWebsiteRequest,
} from '@modules/otherRecommendationWebsite/otherRecommendationWebsiteModel';
import { otherRecommendationWebsiteRepository } from '@modules/otherRecommendationWebsite/otherRecommendationWebsiteRepository';
import { notebookService } from '@modules/notebook/notebookService';

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
    try {
      const website = await otherRecommendationWebsiteRepository.findAllAsync();
      return new ServiceResponse<GetOtherRecommendationWebsiteByIdResponse[]>(
        ResponseStatus.Success,
        'ORWs encontrados',
        website.map(toDTO),
        StatusCodes.OK
      );
    } catch (ex) {
      const errorMessage = `Erro ao encontrar ORWs: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
  findById: async (id: string): Promise<ServiceResponse<GetOtherRecommendationWebsiteByIdResponse | null>> => {
    try {
      const website = await otherRecommendationWebsiteRepository.findByIdAsync(id);
      if (!website) {
        return new ServiceResponse(ResponseStatus.Failed, 'Nenhum ORW encontrado', null, StatusCodes.NOT_FOUND);
      }

      return new ServiceResponse<GetOtherRecommendationWebsiteByIdResponse>(
        ResponseStatus.Success,
        'ORW encontrado',
        toDTO(website),
        StatusCodes.OK
      );
    } catch (ex) {
      const errorMessage = `Erro ao encontrar o ORW: $${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
  create: async (request: CreateOtherRecommendationWebsiteRequest): Promise<ServiceResponse<string | null>> => {
    try {
      const notebookId = request.notebookId;
      const serviceResponse = await notebookService.findById(notebookId);
      if (!serviceResponse.success) {
        return new ServiceResponse(ResponseStatus.Failed, serviceResponse.message, null, serviceResponse.statusCode);
      }

      const website = await otherRecommendationWebsiteRepository.create({
        link: request.link,
        id: uuidv4(),
        name: request.name,
        notebookId: notebookId,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      return new ServiceResponse<string>(ResponseStatus.Success, 'ORW criado', website.id, StatusCodes.CREATED);
    } catch (ex) {
      const errorMessage = `Erro ao criar o ORW: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
  update: async (
    id: string,
    request: UpdateOtherRecommendationWebsiteRequest
  ): Promise<ServiceResponse<string | null>> => {
    try {
      const website = await otherRecommendationWebsiteRepository.findByIdAsync(id);
      if (!website) {
        return new ServiceResponse(ResponseStatus.Failed, 'Nenhum ORW encontrado', null, StatusCodes.NOT_FOUND);
      }

      website.name = request.name;
      website.link = request.link;
      website.updatedAt = new Date();

      await otherRecommendationWebsiteRepository.update(website);

      return new ServiceResponse<string>(ResponseStatus.Success, 'ORW alterado', website.id, StatusCodes.OK);
    } catch (ex) {
      const errorMessage = `Erro ao alterar o ORW: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
  delete: async (id: string): Promise<ServiceResponse<string | null>> => {
    try {
      const website = await otherRecommendationWebsiteRepository.findByIdAsync(id);
      if (!website) {
        return new ServiceResponse(ResponseStatus.Failed, 'Nenhum ORW encontrado', null, StatusCodes.NOT_FOUND);
      }

      await otherRecommendationWebsiteRepository.delete(id);

      return new ServiceResponse<string>(ResponseStatus.Success, 'ORW deletado', website.id, StatusCodes.OK);
    } catch (ex) {
      const errorMessage = `Erro ao alterar o ORS: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
};
