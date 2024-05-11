import cors from 'cors';
import express, { Express } from 'express';
import helmet from 'helmet';
import { pino } from 'pino';

import { openAPIRouter } from '@api-docs/openAPIRouter';
import errorHandler from '@common/middleware/errorHandler';
import rateLimiter from '@common/middleware/rateLimiter';
import requestLogger from '@common/middleware/requestLogger';
import { env } from '@common/utils/envConfig';
import { healthCheckRouter } from '@modules/healthCheck/healthCheckRouter';
import { notebookRouter } from '@modules/notebook/notebookRouter';
import compression from 'compression';
import { compressionMiddleware } from '@common/middleware/compression';
import { partRouter } from '@modules/part/partRouter';
import { otherRecommendationWebsiteRouter } from '@modules/otherRecommendationWebsite/otherRecommendationWebsiteRouter';
import { tagRouter } from '@modules/tag/tagRouter';
import { storeRouter } from '@modules/commissionedStore/commissionedStoreRouter';
import { clusterRouter } from '@modules/clusterOfTags/clusterRouter';

const logger = pino({ name: 'server start' });
const app: Express = express();

// Middlewares
app.use(express.json());
app.use(cors({ origin: env.CORS_ORIGIN, credentials: false, preflightContinue: true }));
app.use(helmet());
app.use(rateLimiter);
app.use(compression({ filter: compressionMiddleware }));

if (env.NODE_ENV !== 'test') {
  app.use(requestLogger());
}

// Routes
app.use('/commissioned-stores', storeRouter);
app.use('/cluster-of-tags', clusterRouter);
app.use('/health-check', healthCheckRouter);
app.use('/notebooks', notebookRouter);
app.use('/parts', partRouter);
app.use('/others-recommendations-websites', otherRecommendationWebsiteRouter);
app.use('/tags', tagRouter);

// Swagger UI
app.use(openAPIRouter);

// Error handlers
app.use(errorHandler);

export { app, logger };
