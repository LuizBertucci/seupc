import { StatusCodes } from 'http-status-codes';
import { randomUUID } from 'crypto';
import {
  CommissionedStoreName,
  CreateCommissionedStoreRequest,
  UpdateCommissionedStoreRequest,
} from '@modules/commissionedStore/commissionedStoreModel';

import { commissionedStoreRepository as repository } from '@modules/commissionedStore/commissionedStoreRepository';
import { commissionedStoreService as service } from '@modules/commissionedStore/commissionedStoreService';
import { notebookService } from '@modules/notebook/notebookService';
import { ServiceResponse } from '@common/models/serviceResponse';
import { NotFoundError } from '@common/models/notFoundError';
import { CommissionedStore } from '@modules/commissionedStore/commissionedStoreModel';

jest.mock('@modules/commissionedStore/commissionedStoreRepository');
jest.mock('@modules/notebook/notebookService');
jest.mock('@src/index');
jest.mock('@src/server');
jest.mock('uuid', () => ({ v4: () => '9c2195df-db50-401b-acea-66b702cb3d92' }));

describe('commissionedStoreService', () => {
  let store: CommissionedStore;

  beforeEach(() => {
    jest.resetAllMocks();
    jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));

    store = {
      id: randomUUID(),
      commissionedCompany: CommissionedStoreName.AMAZON,
      commissionedUrl: 'https://amazon.com.br',
      productUrl: 'https://amazon.com.br/produto/notebook-acer',
      notebookId: randomUUID(),
      createdAt: new Date('2019-12-31'),
      updatedAt: new Date(),
    };
  });

  describe('getAll', () => {
    it('return all commissionedStore', async () => {
      jest.spyOn(repository, 'getAll').mockResolvedValue([store]);

      expect(await service.getAll()).toEqual({
        message: 'Stores encontrados',
        responseObject: [store],
        statusCode: StatusCodes.OK,
        success: true,
      });
      expect(repository.getAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('get', () => {
    it('handles errors for get', async () => {
      jest.spyOn(repository, 'get').mockResolvedValue(null);

      await expect(service.get(randomUUID()).catch()).rejects.toThrow(NotFoundError);
    });

    it('return a Store', async () => {
      jest.spyOn(repository, 'get').mockResolvedValue(store);

      expect(await service.get(store.id)).toEqual({
        message: 'Store encontrado',
        responseObject: store,
        statusCode: StatusCodes.OK,
        success: true,
      });
      expect(repository.get).toHaveBeenCalledTimes(1);
      expect(repository.get).toHaveBeenCalledWith(store.id);
    });
  });

  describe('delete', () => {
    it('handles errors for delete', async () => {
      jest.spyOn(repository, 'get').mockResolvedValue(null);

      await expect(service.delete(randomUUID()).catch()).rejects.toThrow(NotFoundError);
    });

    it('delete a Store', async () => {
      jest.spyOn(repository, 'get').mockResolvedValue(store);
      jest.spyOn(repository, 'delete').mockResolvedValue();

      expect(await service.delete(store.id)).toEqual({
        message: 'Store deletada',
        responseObject: store.id,
        statusCode: StatusCodes.OK,
        success: true,
      });
      expect(repository.get).toHaveBeenCalledTimes(1);
      expect(repository.get).toHaveBeenCalledWith(store.id);
      expect(repository.delete).toHaveBeenCalledTimes(1);
      expect(repository.delete).toHaveBeenCalledWith(store.id);
    });
  });

  describe('update', () => {
    it('handles errors for update', async () => {
      jest.spyOn(repository, 'get').mockResolvedValue(null);

      await expect(service.update(randomUUID(), {} as UpdateCommissionedStoreRequest).catch()).rejects.toThrow(
        NotFoundError
      );
    });

    it('update a Store', async () => {
      const newValues: UpdateCommissionedStoreRequest = {
        productUrl: 'https://amazon.pt/product/acer-notebook',
        commissionedUrl: 'https://amazon.pt',
      };
      const update = { ...store, ...newValues, updatedAt: new Date() };
      jest.spyOn(repository, 'get').mockResolvedValue(store);
      jest.spyOn(repository, 'update').mockResolvedValue(store);

      expect(await service.update(store.id, newValues)).toEqual({
        message: 'Store alterada',
        responseObject: store.id,
        statusCode: StatusCodes.OK,
        success: true,
      });
      expect(repository.get).toHaveBeenCalledTimes(1);
      expect(repository.get).toHaveBeenCalledWith(store.id);
      expect(repository.update).toHaveBeenCalledTimes(1);
      expect(repository.update).toHaveBeenCalledWith(update);
    });
  });

  describe('create', () => {
    it('create a Store', async () => {
      const createValues: CreateCommissionedStoreRequest = {
        commissionedCompany: CommissionedStoreName.AMAZON,
        commissionedUrl: 'https://amazon.com.br',
        productUrl: 'https://amazon.com.br/produto/notebook-acer',
        notebookId: randomUUID(),
      };
      jest.spyOn(repository, 'create').mockResolvedValue(store);
      jest.spyOn(notebookService, 'findById').mockResolvedValue({ success: true } as ServiceResponse);

      expect(await service.create(createValues)).toEqual({
        message: 'Store criada',
        responseObject: store.id,
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
