import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { Request, Response, Router } from 'express';
import { z } from 'zod';

import { createApiResponse } from '@api-docs/openAPIResponseBuilders';
import { handleServiceResponse, validateRequest } from '@common/utils/httpHandlers';
import { notebookService } from '@modules/notebook/notebookService';

import { GetNotebookByIdRequest, GetNotebookByIdResponse } from './notebookModel';

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
    responses: createApiResponse(GetNotebookByIdResponse, 'Success'),
  });

  router.get('/:id', validateRequest(GetNotebookByIdRequest), async (req: Request, res: Response) => {
    const id = parseInt(req.params.id as string, 10);
    const serviceResponse = await notebookService.findById(id);
    handleServiceResponse(serviceResponse, res);
  });

  return router;
})();
