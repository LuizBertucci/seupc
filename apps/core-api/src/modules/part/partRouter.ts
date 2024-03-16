import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { Request, Response, Router } from 'express';
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

  router.get('/', async (_req: Request, res: Response) => {
    const serviceResponse = await partService.findAll();
    handleServiceResponse(serviceResponse, res);
  });

  partRegistry.registerPath({
    method: 'get',
    path: '/parts/{id}',
    tags: ['Part'],
    request: { params: GetPartByIdRequest.shape.params },
    responses: createApiResponse(z.string(), 'Success'),
  });

  router.get('/:id', validateRequest(GetPartByIdRequest), async (req: Request, res: Response) => {
    const serviceResponse = await partService.findById(req.params.id as string);
    handleServiceResponse(serviceResponse, res);
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

  router.post('/', validateRequest(z.object({ body: CreatePartRequest })), async (req: Request, res: Response) => {
    const serviceResponse = await partService.createPart(req.body);
    handleServiceResponse(serviceResponse, res);
  });

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
    async (req: Request, res: Response) => {
      const serviceResponse = await partService.updatePart(req.params.id as string, req.body);
      handleServiceResponse(serviceResponse, res);
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

  router.delete('/:id', validateRequest(GetPartByIdRequest), async (req: Request, res: Response) => {
    const serviceResponse = await partService.deletePart(req.params.id as string);
    handleServiceResponse(serviceResponse, res);
  });

  return router;
})();
