import { StatusCodes } from 'http-status-codes';
import { randomUUID } from 'crypto';
import {
  CreateOtherRecommendationWebsiteRequest,
  OtherRecommendationWebsite,
  UpdateOtherRecommendationWebsiteRequest,
} from '@modules/otherRecommendationWebsite/otherRecommendationWebsiteModel';
import { otherRecommendationWebsiteRepository as repository } from '@modules/otherRecommendationWebsite/otherRecommendationWebsiteRepository';
import { otherRecommendationWebsiteService as service } from '@modules/otherRecommendationWebsite/otherRecommendationWebsiteService';
import { notebookService } from '@modules/notebook/notebookService';
import { ResponseStatus, ServiceResponse } from '@common/models/serviceResponse';

jest.mock('@modules/otherRecommendationWebsite/otherRecommendationWebsiteRepository');
jest.mock('@modules/notebook/notebookService');
jest.mock('@src/index');
jest.mock('@src/server');
jest.mock('uuid', () => ({ v4: () => '9c2195df-db50-401b-acea-66b702cb3d92' }));

describe('otherRecommendationWebsiteService', () => {
  let website: OtherRecommendationWebsite;

  beforeEach(() => {
    jest.resetAllMocks();
    jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));

    website = {
      id: randomUUID(),
      name: 'Zoom',
      link: 'https://zoom.com.br',
      notebookId: randomUUID(),
      createdAt: new Date('2019-12-31'),
      updatedAt: new Date(),
    };
  });

  describe('findAll', () => {
    it('handles errors for findAllAsync', async () => {
      jest.spyOn(repository, 'findAllAsync').mockRejectedValue(new Error('Database error'));

      expect(await service.findAll()).toEqual({
        message: 'Erro ao encontrar ORWs: Database error',
        responseObject: null,
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        success: false,
      });
    });

    it('return all Parts', async () => {
      jest.spyOn(repository, 'findAllAsync').mockResolvedValue([website]);

      expect(await service.findAll()).toEqual({
        message: 'ORWs encontrados',
        responseObject: [website],
        statusCode: StatusCodes.OK,
        success: true,
      });
      expect(repository.findAllAsync).toHaveBeenCalledTimes(1);
    });
  });

  describe('findById', () => {
    it('handles errors for findById', async () => {
      jest.spyOn(repository, 'findByIdAsync').mockResolvedValue(null);

      expect(await service.findById(randomUUID())).toEqual({
        message: 'Nenhum ORW encontrado',
        responseObject: null,
        statusCode: StatusCodes.NOT_FOUND,
        success: false,
      });
    });

    it('return a Part', async () => {
      jest.spyOn(repository, 'findByIdAsync').mockResolvedValue(website);

      expect(await service.findById(website.id)).toEqual({
        message: 'ORW encontrado',
        responseObject: website,
        statusCode: StatusCodes.OK,
        success: true,
      });
      expect(repository.findByIdAsync).toHaveBeenCalledTimes(1);
      expect(repository.findByIdAsync).toHaveBeenCalledWith(website.id);
    });
  });

  describe('delete', () => {
    it('handles errors for delete', async () => {
      jest.spyOn(repository, 'findByIdAsync').mockResolvedValue(null);

      expect(await service.delete(randomUUID())).toEqual({
        message: 'Nenhum ORW encontrado',
        responseObject: null,
        statusCode: StatusCodes.NOT_FOUND,
        success: false,
      });
    });

    it('delete a Part', async () => {
      jest.spyOn(repository, 'findByIdAsync').mockResolvedValue(website);
      jest.spyOn(repository, 'delete').mockResolvedValue();

      expect(await service.delete(website.id)).toEqual({
        message: 'ORW deletado',
        responseObject: website.id,
        statusCode: StatusCodes.OK,
        success: true,
      });
      expect(repository.findByIdAsync).toHaveBeenCalledTimes(1);
      expect(repository.findByIdAsync).toHaveBeenCalledWith(website.id);
      expect(repository.delete).toHaveBeenCalledTimes(1);
      expect(repository.delete).toHaveBeenCalledWith(website.id);
    });
  });

  describe('update', () => {
    it('handles errors for update', async () => {
      jest.spyOn(repository, 'findByIdAsync').mockResolvedValue(null);

      expect(await service.update(randomUUID(), {} as UpdateOtherRecommendationWebsiteRequest)).toEqual({
        message: 'Nenhum ORW encontrado',
        responseObject: null,
        statusCode: StatusCodes.NOT_FOUND,
        success: false,
      });
    });

    it('update an ORW', async () => {
      const newValues: UpdateOtherRecommendationWebsiteRequest = { name: 'Zoom V2', link: 'https://zoomv2.com.br' };
      const update = { ...website, ...newValues, updatedAt: new Date() };
      jest.spyOn(repository, 'findByIdAsync').mockResolvedValue(website);
      jest.spyOn(repository, 'update').mockResolvedValue(website);

      expect(await service.update(website.id, newValues)).toEqual({
        message: 'ORW alterado',
        responseObject: website.id,
        statusCode: StatusCodes.OK,
        success: true,
      });
      expect(repository.findByIdAsync).toHaveBeenCalledTimes(1);
      expect(repository.findByIdAsync).toHaveBeenCalledWith(website.id);
      expect(repository.update).toHaveBeenCalledTimes(1);
      expect(repository.update).toHaveBeenCalledWith(update);
    });
  });

  describe('create', () => {
    it('handles errors for invalid orw', async () => {
      jest
        .spyOn(notebookService, 'findById')
        .mockResolvedValue(
          new ServiceResponse(ResponseStatus.Failed, 'Nenhum notebook encontrado', null, StatusCodes.NOT_FOUND)
        );

      expect(await service.create({ notebookId: randomUUID() } as CreateOtherRecommendationWebsiteRequest)).toEqual(
        new ServiceResponse(ResponseStatus.Failed, 'Nenhum notebook encontrado', null, StatusCodes.NOT_FOUND)
      );
    });

    it('create an ORW', async () => {
      const createValues: CreateOtherRecommendationWebsiteRequest = {
        name: 'Buscapé',
        link: 'https://buscape.com.br',
        notebookId: randomUUID(),
      };
      jest.spyOn(repository, 'create').mockResolvedValue(website);
      jest.spyOn(notebookService, 'findById').mockResolvedValue({ success: true } as ServiceResponse);

      expect(await service.create(createValues)).toEqual({
        message: 'ORW criado',
        responseObject: website.id,
        statusCode: StatusCodes.CREATED,
        success: true,
      });
      expect(repository.create).toHaveBeenCalledTimes(1);
      expect(repository.create).toHaveBeenCalledWith({
        ...createValues,
        createdAt: new Date(),
        updatedAt: new Date(),
        id: '9c2195df-db50-401b-acea-66b702cb3d92',
      });
    });
  });
});
