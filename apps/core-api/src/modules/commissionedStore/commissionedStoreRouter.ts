import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { NextFunction, Request, Response, Router } from 'express';
import { z } from 'zod';

import { createApiResponse } from '@api-docs/openAPIResponseBuilders';
import { handleServiceResponse, validateRequest } from '@common/utils/httpHandlers';
import {
  CreateCommissionedStoreRequest,
  GetCommissionedStoreByIdRequest,
  GetCommissionedStoreByIdResponse,
  UpdateCommissionedStoreRequest,
} from '@modules/commissionedStore/commissionedStoreModel';
import { commissionedStoreService } from '@modules/commissionedStore/commissionedStoreService';

export const storeRegistry = new OpenAPIRegistry();

storeRegistry.register('GetCommissionedStoreByIdRequest', GetCommissionedStoreByIdRequest);

export const storeRouter: Router = (() => {
  const router = express.Router();

  storeRegistry.registerPath({
    method: 'get',
    path: '/commissioned-stores',
    tags: ['Commissioned Store'],
    responses: createApiResponse(z.array(GetCommissionedStoreByIdResponse), 'Success'),
  });

  router.get('/', async (_req: Request, res: Response, next: NextFunction) =>
    commissionedStoreService
      .getAll()
      .then((serviceResponse) => handleServiceResponse(serviceResponse, res))
      .catch(next)
  );

  storeRegistry.registerPath({
    method: 'get',
    path: '/commissioned-stores/{id}',
    tags: ['Commissioned Store'],
    request: { params: GetCommissionedStoreByIdRequest.shape.params },
    responses: createApiResponse(z.string(), 'Success'),
  });

  router.get(
    '/:id',
    validateRequest(GetCommissionedStoreByIdRequest),
    async (req: Request, res: Response, next: NextFunction) =>
      commissionedStoreService
        .get(req.params.id as string)
        .then((serviceResponse) => handleServiceResponse(serviceResponse, res))
        .catch(next)
  );

  storeRegistry.registerPath({
    method: 'post',
    path: '/commissioned-stores',
    tags: ['Commissioned Store'],
    request: {
      body: {
        content: {
          'application/json': {
            schema: CreateCommissionedStoreRequest,
          },
        },
      },
    },
    responses: createApiResponse(z.string(), 'Success'),
  });

  router.post(
    '/',
    validateRequest(z.object({ body: CreateCommissionedStoreRequest })),
    async (req: Request, res: Response, next: NextFunction) =>
      commissionedStoreService
        .create(req.body)
        .then((serviceResponse) => handleServiceResponse(serviceResponse, res))
        .catch(next)
  );

  storeRegistry.registerPath({
    method: 'put',
    path: '/commissioned-stores/{id}',
    tags: ['Commissioned Store'],
    request: {
      params: GetCommissionedStoreByIdRequest.shape.params,
      body: {
        content: {
          'application/json': {
            schema: UpdateCommissionedStoreRequest,
          },
        },
      },
    },
    responses: createApiResponse(z.string(), 'Success'),
  });

  router.put(
    '/:id',
    validateRequest(GetCommissionedStoreByIdRequest),
    validateRequest(z.object({ body: UpdateCommissionedStoreRequest })),
    async (req: Request, res: Response, next: NextFunction) =>
      commissionedStoreService
        .update(req.params.id as string, req.body)
        .then((serviceResponse) => handleServiceResponse(serviceResponse, res))
        .catch(next)
  );

  storeRegistry.registerPath({
    method: 'delete',
    path: '/commissioned-stores/{id}',
    tags: ['Commissioned Store'],
    request: {
      params: GetCommissionedStoreByIdRequest.shape.params,
    },
    responses: createApiResponse(z.string(), 'Success'),
  });

  router.delete(
    '/:id',
    validateRequest(GetCommissionedStoreByIdRequest),
    async (req: Request, res: Response, next: NextFunction) =>
      commissionedStoreService
        .delete(req.params.id as string)
        .then((serviceResponse) => handleServiceResponse(serviceResponse, res))
        .catch(next)
  );

  return router;
})();
