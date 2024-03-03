import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { Request, Response, Router } from 'express';
import { z } from 'zod';

import { createApiResponse } from '@api-docs/openAPIResponseBuilders';
import { handleServiceResponse, validateRequest } from '@common/utils/httpHandlers';
import { brandService } from '@modules/brand/brandService';
import { CreateBrandRequest, GetBrandByIdRequest, GetBrandByIdResponse } from '@modules/brand/brandModel';

export const brandRegistry = new OpenAPIRegistry();

brandRegistry.register('GetBrandByIdResponse', GetBrandByIdResponse);

export const brandRouter: Router = (() => {
  const router = express.Router();

  brandRegistry.registerPath({
    method: 'get',
    path: '/brands',
    tags: ['Brand'],
    responses: createApiResponse(z.array(GetBrandByIdResponse), 'Success'),
  });

  router.get('/', async (_req: Request, res: Response) => {
    const serviceResponse = await brandService.findAll();
    handleServiceResponse(serviceResponse, res);
  });

  brandRegistry.registerPath({
    method: 'get',
    path: '/brands/{id}',
    tags: ['Brand'],
    request: { params: GetBrandByIdRequest.shape.params },
    responses: createApiResponse(z.string(), 'Success'),
  });

  router.get('/:id', validateRequest(GetBrandByIdRequest), async (req: Request, res: Response) => {
    const serviceResponse = await brandService.findById(req.params.id as string);
    handleServiceResponse(serviceResponse, res);
  });

  brandRegistry.registerPath({
    method: 'post',
    path: '/brands',
    tags: ['Brand'],
    request: {
      body: {
        content: {
          'application/json': {
            schema: z.object({ name: z.string(), status: z.string() }),
          },
        },
      },
    },
    responses: createApiResponse(z.string(), 'Success'),
  });

  router.post('/', validateRequest(z.object({body: CreateBrandRequest})), async (req: Request, res: Response) => {
    const serviceResponse = await brandService.createBrand(req.body);
    handleServiceResponse(serviceResponse, res);
  });

  return router;
})();
