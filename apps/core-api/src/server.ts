import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express } from 'express';
import helmet from 'helmet';
import path from 'path';
import { pino } from 'pino';

import { openAPIRouter } from '@api-docs/openAPIRouter';
import errorHandler from '@common/middleware/errorHandler';
import rateLimiter from '@common/middleware/rateLimiter';
import requestLogger from '@common/middleware/requestLogger';
import { getCorsOrigin, getNodeEnv } from '@common/utils/envConfig';
import { healthCheckRouter } from '@modules/healthCheck/healthCheckRouter';
import { notebookRouter } from '@modules/notebook/notebookRouter';
import compression from 'compression';
import { compressionMiddleware } from '@common/middleware/compression';
import { partRouter } from '@modules/part/partRouter';
import { tagRouter } from '@modules/tag/tagRouter';

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
});

const logger = pino({ name: 'server start' });
const app: Express = express();
const corsOrigin = getCorsOrigin();

// Middlewares
app.use(express.json());
app.use(cors({ origin: [corsOrigin], credentials: true }));
app.use(helmet());
app.use(rateLimiter);
app.use(compression({ filter: compressionMiddleware }));

// Request logging
if (getNodeEnv() !== 'test') {
  app.use(requestLogger());
}

// Routes
app.use('/health-check', healthCheckRouter);
app.use('/notebooks', notebookRouter);
app.use('/parts', partRouter);
app.use('/tags', tagRouter);

// Swagger UI
app.use(openAPIRouter);

// Error handlers
app.use(errorHandler());

export { app, logger };
