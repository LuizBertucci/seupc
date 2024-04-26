import { OpenApiGeneratorV3, OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';

import { healthCheckRegistry } from '@modules/healthCheck/healthCheckRouter';
import { notebookRegistry } from '@modules/notebook/notebookRouter';
import { partRegistry } from '@modules/part/partRouter';
import { otherRecommendationWebsiteRegistry } from '@modules/otherRecommendationWebsite/otherRecommendationWebsiteRouter';
import { tagRegistry } from '@modules/tag/tagRouter';
import { storeRegistry } from '@modules/commissionedStore/commissionedStoreRouter';

export function generateOpenAPIDocument() {
  const registry = new OpenAPIRegistry([
    storeRegistry,
    healthCheckRegistry,
    notebookRegistry,
    partRegistry,
    otherRecommendationWebsiteRegistry,
    tagRegistry,
  ]);
  const generator = new OpenApiGeneratorV3(registry.definitions);

  return generator.generateDocument({
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'Swagger API',
    },
    externalDocs: {
      description: 'View the raw OpenAPI Specification in JSON format',
      url: '/swagger.json',
    },
  });
}
