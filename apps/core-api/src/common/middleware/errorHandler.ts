import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ResponseStatus, ServiceResponse } from '@common/models/serviceResponse';
import { logger } from '@src/server';
import { ZodError, ZodIssue } from 'zod';
import { BatchNotFoundError, NotFoundError } from '@common/models/notFoundError';

function handleSyntaxError(err: unknown, _req: Request, res: Response): void {
  if (err instanceof SyntaxError && 'type' in err && 'body' in err) {
    const statusCode = err.type === 'entity.too.large' ? StatusCodes.REQUEST_TOO_LONG : StatusCodes.BAD_REQUEST;
    res.status(statusCode);
    res.json(new ServiceResponse(ResponseStatus.Failed, err.message, err.body, statusCode));
  }
}

function handleInternalServerError(err: unknown, req: Request, res: Response): void {
  if (res.headersSent) {
    return;
  }
  logger.error(err);
  const statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  const message = err instanceof Error && err.message ? err.message : 'unkown error has been thrown';
  res.status(statusCode);
  res.json(
    new ServiceResponse(ResponseStatus.Failed, message, { path: req.originalUrl, timestamp: new Date() }, statusCode)
  );
}

function handleZodError(err: unknown, res: Response): void {
  if (err instanceof ZodError) {
    const statusCode = StatusCodes.BAD_REQUEST;
    res
      .status(statusCode)
      .send(new ServiceResponse<ZodIssue[]>(ResponseStatus.Failed, 'Invalid input', err.issues, statusCode));
  }
}

function handleNotFoundError(err: unknown, res: Response) {
  if (err instanceof NotFoundError || err instanceof BatchNotFoundError) {
    const statusCode = StatusCodes.NOT_FOUND;
    res.status(statusCode).send(new ServiceResponse<null>(ResponseStatus.Failed, err.message, null, statusCode));
  }
}

export default (err: unknown, req: Request, res: Response, next: NextFunction): void => {
  handleSyntaxError(err, req, res);
  handleZodError(err, res);
  handleNotFoundError(err, res);
  handleInternalServerError(err, req, res);
  next(err);
};
