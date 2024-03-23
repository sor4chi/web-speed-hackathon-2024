import { createRoute, OpenAPIHono } from '@hono/zod-openapi';

import { GetBookListRequestQuerySchema } from '@wsh-2024/schema/src/api/books/GetBookListRequestQuery';
import { GetBookListResponseForSearchSchema } from '@wsh-2024/schema/src/api/books/GetBookListResponseForSearch';

import { bookRepository } from '../../../repositories';

const app = new OpenAPIHono();

const route = createRoute({
  method: 'get',
  path: '/api/v1/books-for-search',
  request: {
    query: GetBookListRequestQuerySchema,
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: GetBookListResponseForSearchSchema,
        },
      },
      description: 'Get book list.',
    },
  },
  tags: ['[App] Books API'],
});

app.openapi(route, async (c) => {
  const query = c.req.valid('query');
  const res = await bookRepository.readAllForSearch({ query });

  if (res.isErr()) {
    throw res.error;
  }
  return c.json(res.value);
});

export { app as getBookListApp };
