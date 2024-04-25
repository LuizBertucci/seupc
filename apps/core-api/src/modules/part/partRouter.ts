import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { NextFunction, Request, Response, Router } from 'express';
import { z } from 'zod';

import { createApiResponse } from '@api-docs/openAPIResponseBuilders';
import { handleServiceResponse, validateRequest } from '@common/utils/httpHandlers';

import { CreatePartRequest, GetPartByIdRequest, GetPartByIdResponse, UpdatePartRequest } from '@modules/part/partModel';
import { partService } from '@modules/part/partService';

export const partRegistry = new OpenAPIRegistry();

partRegistry.register('GetPartByIdResponse', GetPartByIdResponse);

export const partRouter: Router = (() => {
  const router = express.Router();

  partRegistry.registerPath({
    method: 'get',
    path: '/parts',
    tags: ['Part'],
    responses: createApiResponse(z.array(GetPartByIdResponse), 'Success'),
  });

  router.get('/', (_req: Request, res: Response, next: NextFunction): void => {
    partService
      .findAll()
      .then((serviceResponse) => handleServiceResponse(serviceResponse, res))
      .catch(next);
  });

  partRegistry.registerPath({
    method: 'get',
    path: '/parts/{id}',
    tags: ['Part'],
    request: { params: GetPartByIdRequest.shape.params },
    responses: createApiResponse(z.string(), 'Success'),
  });

  router.get('/:id', validateRequest(GetPartByIdRequest), (req: Request, res: Response, next: NextFunction): void => {
    partService
      .findById(req.params.id as string)
      .then((serviceResponse) => handleServiceResponse(serviceResponse, res))
      .catch(next);
  });

  partRegistry.registerPath({
    method: 'post',
    path: '/parts',
    tags: ['Part'],
    request: {
      body: {
        content: {
          'application/json': {
            schema: CreatePartRequest,
          },
        },
      },
    },
    responses: createApiResponse(z.string(), 'Success'),
  });

  router.post(
    '/',
    validateRequest(z.object({ body: CreatePartRequest })),
    (req: Request, res: Response, next: NextFunction): void => {
      partService
        .create(req.body)
        .then((serviceResponse) => handleServiceResponse(serviceResponse, res))
        .catch(next);
    }
  );

  partRegistry.registerPath({
    method: 'put',
    path: '/parts/{id}',
    tags: ['Part'],
    request: {
      params: GetPartByIdRequest.shape.params,
      body: {
        content: {
          'application/json': {
            schema: UpdatePartRequest,
          },
        },
      },
    },
    responses: createApiResponse(z.string(), 'Success'),
  });

  router.put(
    '/:id',
    validateRequest(GetPartByIdRequest),
    validateRequest(z.object({ body: UpdatePartRequest })),
    (req: Request, res: Response, next: NextFunction): void => {
      partService
        .update(req.params.id as string, req.body)
        .then((serviceResponse) => handleServiceResponse(serviceResponse, res))
        .catch(next);
    }
  );

  partRegistry.registerPath({
    method: 'delete',
    path: '/parts/{id}',
    tags: ['Part'],
    request: {
      params: GetPartByIdRequest.shape.params,
    },
    responses: createApiResponse(z.string(), 'Success'),
  });

  router.delete(
    '/:id',
    validateRequest(GetPartByIdRequest),
    (req: Request, res: Response, next: NextFunction): void => {
      partService
        .delete(req.params.id as string)
        .then((serviceResponse) => handleServiceResponse(serviceResponse, res))
        .catch(next);
    }
  );

  return router;
})();
