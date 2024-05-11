import { StatusCodes } from 'http-status-codes';

import { ResponseStatus, ServiceResponse } from '@common/models/serviceResponse';
import { v4 as uuidv4 } from 'uuid';
import { BatchNotFoundError, NotFoundError } from '@common/models/notFoundError';
import { Cluster, ClusterDTO, CreateClusterDTO, UpdateClusterDTO } from '@modules/clusterOfTags/clusterModel';
import { clusterRepository } from '@modules/clusterOfTags/clusterRepository';
import { tagService } from '@modules/tag/tagService';

const toDTO = (cluster: Cluster): ClusterDTO => ({
  id: cluster.id,
  type: cluster.type,
  name: cluster.name,
  createdAt: cluster.createdAt,
  updatedAt: cluster.updatedAt,
});

export const clusterService = {
  getAll: async (): Promise<ServiceResponse<ClusterDTO[] | null>> => {
    const clusters = await clusterRepository.getAll();
    return new ServiceResponse<ClusterDTO[]>(
      ResponseStatus.Success,
      'Clusters encontrados',
      clusters.map(toDTO),
      StatusCodes.OK
    );
  },
  get: async (id: string): Promise<ServiceResponse<ClusterDTO | null>> => {
    const cluster = await clusterRepository.get(id);
    if (!cluster) {
      throw new NotFoundError(id);
    }

    return new ServiceResponse<ClusterDTO>(
      ResponseStatus.Success,
      'Cluster encontrado',
      toDTO(cluster),
      StatusCodes.OK
    );
  },
  create: async (request: CreateClusterDTO): Promise<ServiceResponse<string>> => {
    const tagsIds = request.tagsIds ?? [];
    if (tagsIds.length) {
      const { responseObject: tags } = await tagService.batchGet(tagsIds);
      if (tags.length !== tagsIds.length) {
        throw new BatchNotFoundError();
      }
    }

    const cluster = await clusterRepository.create(
      {
        id: uuidv4(),
        name: request.name,
        type: request.type,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      tagsIds
    );

    return new ServiceResponse<string>(ResponseStatus.Success, 'Cluster criado', cluster.id, StatusCodes.CREATED);
  },
  update: async (id: string, request: UpdateClusterDTO): Promise<ServiceResponse<string | null>> => {
    const cluster = await clusterRepository.get(id);
    if (!cluster) {
      throw new NotFoundError(id);
    }

    cluster.name = request.name;
    cluster.updatedAt = new Date();

    await clusterRepository.update(cluster);

    return new ServiceResponse<string>(ResponseStatus.Success, 'Cluster alterado', cluster.id, StatusCodes.OK);
  },
  delete: async (id: string): Promise<ServiceResponse<string | null>> => {
    const cluster = await clusterRepository.get(id);
    if (!cluster) {
      throw new NotFoundError(id);
    }
    await clusterRepository.delete(id);
    return new ServiceResponse<string>(ResponseStatus.Success, 'Cluster deletado', cluster.id, StatusCodes.OK);
  },
};
