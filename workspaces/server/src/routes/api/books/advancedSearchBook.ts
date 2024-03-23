import { createRoute, OpenAPIHono } from '@hono/zod-openapi';

import { AdvancedSearchBookRequestQuerySchema } from '@wsh-2024/schema/src/api/books/AdvancedSearchBookRequestQuery';
import { AdvancedSearchBookResponseSchema } from '@wsh-2024/schema/src/api/books/AdvancedSearchBookResponse';

import { bookRepository } from '../../../repositories';

const app = new OpenAPIHono();

const route = createRoute({
  method: 'get',
  path: '/api/v1/books-for-advanced-search',
  request: {
    query: AdvancedSearchBookRequestQuerySchema,
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: AdvancedSearchBookResponseSchema,
        },
      },
      description: 'Search books (advanced search).',
    },
  },
  tags: ['[App] Books API'],
});

app.openapi(route, async (c) => {
  const query = c.req.valid('query');
  const res = await bookRepository.readAllForAdvancedSearch({ query });

  if (res.isErr()) {
    throw res.error;
  }
  return c.json(res.value);
});

export { app as advancedSearchBookApp };
