import { createRoute, OpenAPIHono } from '@hono/zod-openapi';

import { GetBookRequestParamsSchema } from '@wsh-2024/schema/src/api/books/GetBookRequestParams';
import { GetBookResponseWithEpisodeSchema } from '@wsh-2024/schema/src/api/books/GetBookResponseWithEpisode';

import { bookRepository } from '../../../repositories';

const app = new OpenAPIHono();

const route = createRoute({
  method: 'get',
  path: '/api/v1/books-with-episode/{bookId}',
  request: {
    params: GetBookRequestParamsSchema,
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: GetBookResponseWithEpisodeSchema,
        },
      },
      description: 'Get book.',
    },
  },
  tags: ['[App] Books API'],
});

app.openapi(route, async (c) => {
  const params = c.req.valid('param');
  const res = await bookRepository.readWithEpisode({ params });

  if (res.isErr()) {
    throw res.error;
  }
  return c.json(res.value);
});

export { app as getBookWithEpisodeApp };
