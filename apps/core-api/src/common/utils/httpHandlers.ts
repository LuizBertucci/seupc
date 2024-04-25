import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ZodError, ZodIssue, ZodSchema } from 'zod';

import { ResponseStatus, ServiceResponse } from '@common/models/serviceResponse';

export const handleServiceResponse = (serviceResponse: ServiceResponse<any>, response: Response) => {
  return response.status(serviceResponse.statusCode).send(serviceResponse);
};

export const validateRequest = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse({ body: req.body, query: req.query, params: req.params });
    next();
  } catch (err) {
    const statusCode = StatusCodes.BAD_REQUEST;
    res
      .status(statusCode)
      .send(
        new ServiceResponse<ZodIssue[]>(ResponseStatus.Failed, 'Invalid input', (err as ZodError).issues, statusCode)
      );
  }
};
