import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { NextFunction, Request, Response, Router } from 'express';
import { z } from 'zod';

import { createApiResponse } from '@api-docs/openAPIResponseBuilders';
import { handleServiceResponse, validateRequest } from '@common/utils/httpHandlers';
import {
  CreateOtherRecommendationWebsiteRequest,
  GetOtherRecommendationWebsiteByIdRequest,
  GetOtherRecommendationWebsiteByIdResponse,
  UpdateOtherRecommendationWebsiteRequest,
} from '@modules/otherRecommendationWebsite/otherRecommendationWebsiteModel';
import { otherRecommendationWebsiteService } from '@modules/otherRecommendationWebsite/otherRecommendationWebsiteService';

export const otherRecommendationWebsiteRegistry = new OpenAPIRegistry();

otherRecommendationWebsiteRegistry.register(
  'GetOtherRecommendationWebsiteByIdResponse',
  GetOtherRecommendationWebsiteByIdResponse
);

export const otherRecommendationWebsiteRouter: Router = (() => {
  const router = express.Router();

  otherRecommendationWebsiteRegistry.registerPath({
    method: 'get',
    path: '/others-recommendations-websites',
    tags: ['Other Recommendation Website'],
    responses: createApiResponse(z.array(GetOtherRecommendationWebsiteByIdResponse), 'Success'),
  });

  router.get('/', (_req: Request, res: Response, next: NextFunction) => {
    otherRecommendationWebsiteService
      .findAll()
      .then((serviceResponse) => handleServiceResponse(serviceResponse, res))
      .catch(next);
  });

  otherRecommendationWebsiteRegistry.registerPath({
    method: 'get',
    path: '/others-recommendations-websites/{id}',
    tags: ['Other Recommendation Website'],
    request: { params: GetOtherRecommendationWebsiteByIdRequest.shape.params },
    responses: createApiResponse(z.string(), 'Success'),
  });

  router.get(
    '/:id',
    validateRequest(GetOtherRecommendationWebsiteByIdRequest),
    (req: Request, res: Response, next: NextFunction) => {
      otherRecommendationWebsiteService
        .findById(req.params.id as string)
        .then((serviceResponse) => handleServiceResponse(serviceResponse, res))
        .catch(next);
    }
  );

  otherRecommendationWebsiteRegistry.registerPath({
    method: 'post',
    path: '/others-recommendations-websites',
    tags: ['Other Recommendation Website'],
    request: {
      body: {
        content: {
          'application/json': {
            schema: CreateOtherRecommendationWebsiteRequest,
          },
        },
      },
    },
    responses: createApiResponse(z.string(), 'Success'),
  });

  router.post(
    '/',
    validateRequest(z.object({ body: CreateOtherRecommendationWebsiteRequest })),
    (req: Request, res: Response, next: NextFunction) => {
      otherRecommendationWebsiteService
        .create(req.body)
        .then((serviceResponse) => handleServiceResponse(serviceResponse, res))
        .catch(next);
    }
  );

  otherRecommendationWebsiteRegistry.registerPath({
    method: 'put',
    path: '/others-recommendations-websites/{id}',
    tags: ['Other Recommendation Website'],
    request: {
      params: GetOtherRecommendationWebsiteByIdRequest.shape.params,
      body: {
        content: {
          'application/json': {
            schema: UpdateOtherRecommendationWebsiteRequest,
          },
        },
      },
    },
    responses: createApiResponse(z.string(), 'Success'),
  });

  router.put(
    '/:id',
    validateRequest(GetOtherRecommendationWebsiteByIdRequest),
    validateRequest(z.object({ body: UpdateOtherRecommendationWebsiteRequest })),
    (req: Request, res: Response, next: NextFunction) => {
      otherRecommendationWebsiteService
        .update(req.params.id as string, req.body)
        .then((serviceResponse) => handleServiceResponse(serviceResponse, res))
        .catch(next);
    }
  );

  otherRecommendationWebsiteRegistry.registerPath({
    method: 'delete',
    path: '/others-recommendations-websites/{id}',
    tags: ['Other Recommendation Website'],
    request: {
      params: GetOtherRecommendationWebsiteByIdRequest.shape.params,
    },
    responses: createApiResponse(z.string(), 'Success'),
  });

  router.delete(
    '/:id',
    validateRequest(GetOtherRecommendationWebsiteByIdRequest),
    (req: Request, res: Response, next: NextFunction) => {
      otherRecommendationWebsiteService
        .delete(req.params.id as string)
        .then((serviceResponse) => handleServiceResponse(serviceResponse, res))
        .catch(next);
    }
  );

  return router;
})();
