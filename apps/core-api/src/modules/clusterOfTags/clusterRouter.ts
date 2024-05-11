import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { NextFunction, Request, Response, Router } from 'express';
import { z } from 'zod';

import { createApiResponse } from '@api-docs/openAPIResponseBuilders';
import { handleServiceResponse, validateRequest } from '@common/utils/httpHandlers';
import { clusterService } from '@modules/clusterOfTags/clusterService';
import {
  ClusterDTO,
  CreateClusterDTO,
  GetClusterByIdRequest,
  UpdateClusterDTO,
} from '@modules/clusterOfTags/clusterModel';
import { tagService } from '@modules/tag/tagService';
import { GetTagByIdResponse } from '@modules/tag/tagModel';

export const clusterRegistry = new OpenAPIRegistry();

clusterRegistry.register('GetClusterByIdRequest', GetClusterByIdRequest);

export const clusterRouter: Router = (() => {
  const router = express.Router();

  clusterRegistry.registerPath({
    method: 'get',
    path: '/cluster-of-tags',
    tags: ['Cluster of Tags'],
    responses: createApiResponse(z.array(CreateClusterDTO), 'Success'),
  });

  router.get('/', async (_req: Request, res: Response, next: NextFunction) =>
    clusterService
      .getAll()
      .then((serviceResponse) => handleServiceResponse(serviceResponse, res))
      .catch(next)
  );

  clusterRegistry.registerPath({
    method: 'get',
    path: '/cluster-of-tags/{id}',
    tags: ['Cluster of Tags'],
    request: { params: GetClusterByIdRequest.shape.params },
    responses: createApiResponse(ClusterDTO, 'Success'),
  });

  router.get('/:id', validateRequest(GetClusterByIdRequest), async (req: Request, res: Response, next: NextFunction) =>
    clusterService
      .get(req.params.id as string)
      .then((serviceResponse) => handleServiceResponse(serviceResponse, res))
      .catch(next)
  );

  clusterRegistry.registerPath({
    method: 'post',
    path: '/cluster-of-tags',
    tags: ['Cluster of Tags'],
    request: {
      body: {
        content: {
          'application/json': {
            schema: CreateClusterDTO,
          },
        },
      },
    },
    responses: createApiResponse(z.string(), 'Success'),
  });

  router.post(
    '/',
    validateRequest(z.object({ body: CreateClusterDTO })),
    async (req: Request, res: Response, next: NextFunction) =>
      clusterService
        .create(req.body)
        .then((serviceResponse) => handleServiceResponse(serviceResponse, res))
        .catch(next)
  );

  clusterRegistry.registerPath({
    method: 'put',
    path: '/cluster-of-tags/{id}',
    tags: ['Cluster of Tags'],
    request: {
      params: GetClusterByIdRequest.shape.params,
      body: {
        content: {
          'application/json': {
            schema: UpdateClusterDTO,
          },
        },
      },
    },
    responses: createApiResponse(z.string(), 'Success'),
  });

  router.put(
    '/:id',
    validateRequest(GetClusterByIdRequest),
    validateRequest(z.object({ body: UpdateClusterDTO })),
    async (req: Request, res: Response, next: NextFunction) =>
      clusterService
        .update(req.params.id as string, req.body)
        .then((serviceResponse) => handleServiceResponse(serviceResponse, res))
        .catch(next)
  );

  clusterRegistry.registerPath({
    method: 'delete',
    path: '/cluster-of-tags/{id}',
    tags: ['Cluster of Tags'],
    request: {
      params: GetClusterByIdRequest.shape.params,
    },
    responses: createApiResponse(z.string(), 'Success'),
  });

  router.delete(
    '/:id',
    validateRequest(GetClusterByIdRequest),
    async (req: Request, res: Response, next: NextFunction) =>
      clusterService
        .delete(req.params.id as string)
        .then((serviceResponse) => handleServiceResponse(serviceResponse, res))
        .catch(next)
  );

  clusterRegistry.registerPath({
    method: 'get',
    path: '/cluster-of-tags/{id}/tags',
    tags: ['Cluster of Tags', 'Tag'],
    request: {
      params: GetClusterByIdRequest.shape.params,
    },
    responses: createApiResponse(z.array(GetTagByIdResponse), 'Success'),
  });

  router.get(
    '/:id/tags',
    validateRequest(GetClusterByIdRequest),
    async (req: Request, res: Response, next: NextFunction) =>
      tagService
        .getTagsByClusterId(req.params.id as string)
        .then((serviceResponse) => handleServiceResponse(serviceResponse, res))
        .catch(next)
  );
  return router;
})();
