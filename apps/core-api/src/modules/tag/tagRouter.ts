import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { Request, Response, Router } from 'express';
import { z } from 'zod';

import { createApiResponse } from '@api-docs/openAPIResponseBuilders';
import { handleServiceResponse, validateRequest } from '@common/utils/httpHandlers';
import {
  AddPartsOnTagsRequest,
  CreateTagRequest,
  GetTagByIdRequest,
  GetTagByIdResponse,
  UpdateTagRequest,
} from '@modules/tag/tagModel';
import { tagService } from '@modules/tag/tagService';

export const tagRegistry = new OpenAPIRegistry();

tagRegistry.register('GetTagByIdRequest', GetTagByIdRequest);

export const tagRouter: Router = (() => {
  const router = express.Router();

  tagRegistry.registerPath({
    method: 'get',
    path: '/tags',
    tags: ['Tag'],
    responses: createApiResponse(z.array(GetTagByIdResponse), 'Success'),
  });

  router.get('/', async (_req: Request, res: Response) => {
    const serviceResponse = await tagService.findAll();
    handleServiceResponse(serviceResponse, res);
  });

  tagRegistry.registerPath({
    method: 'get',
    path: '/tags/{id}',
    tags: ['Tag'],
    request: { params: GetTagByIdRequest.shape.params },
    responses: createApiResponse(z.string(), 'Success'),
  });

  router.get('/:id', validateRequest(GetTagByIdRequest), async (req: Request, res: Response) => {
    const serviceResponse = await tagService.findById(req.params.id as string);
    handleServiceResponse(serviceResponse, res);
  });

  tagRegistry.registerPath({
    method: 'post',
    path: '/tags',
    tags: ['Tag'],
    request: {
      body: {
        content: {
          'application/json': {
            schema: CreateTagRequest,
          },
        },
      },
    },
    responses: createApiResponse(z.string(), 'Success'),
  });

  router.post('/', validateRequest(z.object({ body: CreateTagRequest })), async (req: Request, res: Response) => {
    const serviceResponse = await tagService.create(req.body);
    handleServiceResponse(serviceResponse, res);
  });

  tagRegistry.registerPath({
    method: 'put',
    path: '/tags/{id}',
    tags: ['Tag'],
    request: {
      params: GetTagByIdRequest.shape.params,
      body: {
        content: {
          'application/json': {
            schema: UpdateTagRequest,
          },
        },
      },
    },
    responses: createApiResponse(z.string(), 'Success'),
  });

  router.put(
    '/:id',
    validateRequest(GetTagByIdResponse),
    validateRequest(z.object({ body: UpdateTagRequest })),
    async (req: Request, res: Response) => {
      const serviceResponse = await tagService.update(req.params.id as string, req.body);
      handleServiceResponse(serviceResponse, res);
    }
  );

  tagRegistry.registerPath({
    method: 'delete',
    path: '/tags/{id}',
    tags: ['Tag'],
    request: {
      params: GetTagByIdRequest.shape.params,
    },
    responses: createApiResponse(z.string(), 'Success'),
  });

  router.delete('/:id', validateRequest(GetTagByIdRequest), async (req: Request, res: Response) => {
    const serviceResponse = await tagService.delete(req.params.id as string);
    handleServiceResponse(serviceResponse, res);
  });

  tagRegistry.registerPath({
    method: 'post',
    path: '/tags/add-parts',
    tags: ['Tag', 'Part'],
    request: {
      body: {
        content: {
          'application/json': {
            schema: UpdateTagRequest,
          },
        },
      },
    },
    responses: createApiResponse(z.string(), 'Success'),
  });

  router.post(
    '/add-parts',
    validateRequest(z.object({ body: AddPartsOnTagsRequest })),
    async (req: Request, res: Response) => {
      const serviceResponse = await tagService.addParts(req.body);
      handleServiceResponse(serviceResponse, res);
    }
  );

  return router;
})();
