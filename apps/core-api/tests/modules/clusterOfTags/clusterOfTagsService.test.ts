import { StatusCodes } from 'http-status-codes';
import { randomUUID } from 'crypto';

import { clusterRepository as repository } from '@modules/clusterOfTags/clusterRepository';
import { clusterService as service } from '@modules/clusterOfTags/clusterService';
import { ServiceResponse } from '@common/models/serviceResponse';
import { NotFoundError } from '@common/models/notFoundError';
import { Cluster, ClusterType, CreateClusterDTO, UpdateClusterDTO } from '@modules/clusterOfTags/clusterModel';
import { tagService } from '@modules/tag/tagService';

jest.mock('@modules/clusterOfTags/clusterRepository');
jest.mock('@modules/tag/tagService');
jest.mock('@src/index');
jest.mock('@src/server');
jest.mock('uuid', () => ({ v4: () => '9c2195df-db50-401b-acea-66b702cb3d92' }));

describe('clusterOfTagsService', () => {
  let cluster: Cluster;

  beforeEach(() => {
    jest.resetAllMocks();
    jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));

    cluster = {
      id: randomUUID(),
      name: 'Math',
      type: ClusterType.UNIVERSITY,
      createdAt: new Date('2019-12-31'),
      updatedAt: new Date(),
    };
  });

  describe('getAll', () => {
    it('return all clusters', async () => {
      jest.spyOn(repository, 'getAll').mockResolvedValue([cluster]);

      expect(await service.getAll()).toEqual({
        message: 'Clusters encontrados',
        responseObject: [cluster],
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

    it('return a Cluster', async () => {
      jest.spyOn(repository, 'get').mockResolvedValue(cluster);

      expect(await service.get(cluster.id)).toEqual({
        message: 'Cluster encontrado',
        responseObject: cluster,
        statusCode: StatusCodes.OK,
        success: true,
      });
      expect(repository.get).toHaveBeenCalledTimes(1);
      expect(repository.get).toHaveBeenCalledWith(cluster.id);
    });
  });

  describe('delete', () => {
    it('handles errors for delete', async () => {
      jest.spyOn(repository, 'get').mockResolvedValue(null);

      await expect(service.delete(randomUUID()).catch()).rejects.toThrow(NotFoundError);
    });

    it('delete a Cluster', async () => {
      jest.spyOn(repository, 'get').mockResolvedValue(cluster);
      jest.spyOn(repository, 'delete').mockResolvedValue();

      expect(await service.delete(cluster.id)).toEqual({
        message: 'Cluster deletado',
        responseObject: cluster.id,
        statusCode: StatusCodes.OK,
        success: true,
      });
      expect(repository.get).toHaveBeenCalledTimes(1);
      expect(repository.get).toHaveBeenCalledWith(cluster.id);
      expect(repository.delete).toHaveBeenCalledTimes(1);
      expect(repository.delete).toHaveBeenCalledWith(cluster.id);
    });
  });

  describe('update', () => {
    it('handles errors for update', async () => {
      jest.spyOn(repository, 'get').mockResolvedValue(null);

      await expect(service.update(randomUUID(), {} as UpdateClusterDTO).catch()).rejects.toThrow(NotFoundError);
    });

    it('update a Cluster', async () => {
      const newValues: UpdateClusterDTO = {
        name: 'AEDs',
      };
      const update = { ...cluster, ...newValues, updatedAt: new Date() };
      jest.spyOn(repository, 'get').mockResolvedValue(cluster);
      jest.spyOn(repository, 'update').mockResolvedValue(cluster);

      expect(await service.update(cluster.id, newValues)).toEqual({
        message: 'Cluster alterado',
        responseObject: cluster.id,
        statusCode: StatusCodes.OK,
        success: true,
      });
      expect(repository.get).toHaveBeenCalledTimes(1);
      expect(repository.get).toHaveBeenCalledWith(cluster.id);
      expect(repository.update).toHaveBeenCalledTimes(1);
      expect(repository.update).toHaveBeenCalledWith(update);
    });
  });

  describe('create', () => {
    it('create a Cluster', async () => {
      const createValues: CreateClusterDTO = {
        name: 'Physic',
        type: ClusterType.UNIVERSITY,
      };
      jest.spyOn(repository, 'create').mockResolvedValue(cluster);
      jest.spyOn(tagService, 'get').mockResolvedValue({ success: true } as ServiceResponse);

      expect(await service.create(createValues)).toEqual({
        message: 'Cluster criado',
        responseObject: cluster.id,
        statusCode: StatusCodes.CREATED,
        success: true,
      });
      expect(repository.create).toHaveBeenCalledTimes(1);
      expect(repository.create).toHaveBeenCalledWith(
        {
          ...createValues,
          createdAt: new Date(),
          updatedAt: new Date(),
          id: '9c2195df-db50-401b-acea-66b702cb3d92',
        },
        []
      );
    });
  });
});
