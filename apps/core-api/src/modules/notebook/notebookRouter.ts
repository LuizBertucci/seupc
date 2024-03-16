import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { NextFunction, Request, Response, Router } from 'express';
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

  router.get('/', (_req: Request, res: Response, next: NextFunction) => {
    notebookService
      .findAll()
      .then((serviceResponse) => handleServiceResponse(serviceResponse, res))
      .catch(next);
  });

  notebookRegistry.registerPath({
    method: 'get',
    path: '/notebooks/{id}',
    tags: ['Notebook'],
    request: { params: GetNotebookByIdRequest.shape.params },
    responses: createApiResponse(z.string(), 'Success'),
  });

  router.get('/:id', validateRequest(GetNotebookByIdRequest), (req: Request, res: Response, next: NextFunction) => {
    notebookService
      .findById(req.params.id as string)
      .then((serviceResponse) => handleServiceResponse(serviceResponse, res))
      .catch(next);
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

  router.post(
    '/',
    validateRequest(z.object({ body: CreateNotebookRequest })),
    (req: Request, res: Response, next: NextFunction) => {
      notebookService
        .createNotebook(req.body)
        .then((serviceResponse) => handleServiceResponse(serviceResponse, res))
        .catch(next);
    }
  );

  return router;
})();
