import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { Request, Response, Router } from 'express';
import { z } from 'zod';

import { createApiResponse } from '@api-docs/openAPIResponseBuilders';
import { handleServiceResponse, validateRequest } from '@common/utils/httpHandlers';
import { notebookService } from '@modules/notebook/notebookService';

import { CreateNotebookRequest, GetNotebookByIdRequest, GetNotebookByIdResponse } from './notebookModel';

export const notebookRegistry = new OpenAPIRegistry();

notebookRegistry.register('GetNotebookByIdResponse', GetNotebookByIdResponse);

export const notebookRouter: Router = (() => {
  const router = express.Router();

  notebookRegistry.registerPath({
    method: 'get',
    path: '/notebooks',
    tags: ['Notebook'],
    responses: createApiResponse(z.array(GetNotebookByIdResponse), 'Success'),
  });

  router.get('/', async (_req: Request, res: Response) => {
    const serviceResponse = await notebookService.findAll();
    handleServiceResponse(serviceResponse, res);
  });

  notebookRegistry.registerPath({
    method: 'get',
    path: '/notebooks/{id}',
    tags: ['Notebook'],
    request: { params: GetNotebookByIdRequest.shape.params },
    responses: createApiResponse(z.string(), 'Success'),
  });

  router.get('/:id', validateRequest(GetNotebookByIdRequest), async (req: Request, res: Response) => {
    const serviceResponse = await notebookService.findById(req.params.id as string);
    handleServiceResponse(serviceResponse, res);
  });

  notebookRegistry.registerPath({
    method: 'post',
    path: '/notebooks',
    tags: ['Notebook'],
    request: {
      body: {
        content: {
          'application/json': {
            schema: z.object({ title: z.string() }),
          },
        },
      },
    },
    responses: createApiResponse(z.string(), 'Success'),
  });

  router.post('/', validateRequest(z.object({ body: CreateNotebookRequest })), async (req: Request, res: Response) => {
    const serviceResponse = await notebookService.create(req.body);
    handleServiceResponse(serviceResponse, res);
  });

  return router;
})();
