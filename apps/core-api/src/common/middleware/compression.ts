import compression from 'compression';
import { Request, Response } from 'express';

export function compressionMiddleware(req: Request, res: Response): boolean {
  const xNoCompression = req.headers['x-no-compression'];
  if (xNoCompression && typeof xNoCompression === 'string' && xNoCompression.toLowerCase() === 'true') {
    return false;
  }
  return compression.filter(req, res);
}
