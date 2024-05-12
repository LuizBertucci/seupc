import compression from 'compression';
import { Request, Response } from 'express';

/**
 * Filter Function for the compression middleware
 * @param req HTTPs Request
 * @param res HTTPs Response
 * @returns Returns false if request header contains x-no-compression
 */
export function compressionMiddleware(req: Request, res: Response): boolean {
  const xNoCompression = req.headers['x-no-compression'];
  if (xNoCompression && typeof xNoCompression === 'string' && xNoCompression.toLowerCase() === 'true') {
    // don't compress responses with this request header
    return false;
  }

  // fallback to standard filter function
  return compression.filter(req, res);
}
