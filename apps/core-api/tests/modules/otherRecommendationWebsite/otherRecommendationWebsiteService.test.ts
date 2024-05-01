import { StatusCodes } from 'http-status-codes';
import { randomUUID } from 'crypto';
import {
  CreateOtherRecommendationWebsiteRequest,
  ORWName,
  OtherRecommendationWebsite,
  UpdateOtherRecommendationWebsiteRequest,
} from '@modules/otherRecommendationWebsite/otherRecommendationWebsiteModel';
import { otherRecommendationWebsiteRepository as repository } from '@modules/otherRecommendationWebsite/otherRecommendationWebsiteRepository';
import { otherRecommendationWebsiteService as service } from '@modules/otherRecommendationWebsite/otherRecommendationWebsiteService';
import { notebookService } from '@modules/notebook/notebookService';
import { ServiceResponse } from '@common/models/serviceResponse';
import { NotFoundError } from '@common/models/notFoundError';

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
      name: ORWName.ZOOM,
      link: 'https://zoom.com.br',
      notebookId: randomUUID(),
      createdAt: new Date('2019-12-31'),
      updatedAt: new Date(),
    };
  });

  describe('findAll', () => {
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

      await expect(service.findById(randomUUID()).catch()).rejects.toThrow(NotFoundError);
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

      await expect(service.delete(randomUUID()).catch()).rejects.toThrow(NotFoundError);
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

      await expect(service.update(randomUUID(), {} as UpdateOtherRecommendationWebsiteRequest).catch()).rejects.toThrow(
        NotFoundError
      );
    });

    it('update an ORW', async () => {
      const newValues: UpdateOtherRecommendationWebsiteRequest = {
        name: ORWName.BUSCAPE,
        link: 'https://buscape.com.br',
      };
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
    it('create an ORW', async () => {
      const createValues: CreateOtherRecommendationWebsiteRequest = {
        name: ORWName.BUSCAPE,
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
