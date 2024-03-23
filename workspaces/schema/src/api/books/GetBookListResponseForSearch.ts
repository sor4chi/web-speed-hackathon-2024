import { createSelectSchema } from 'drizzle-zod';
import type { z } from 'zod';

import { book, image } from '../../models';

export const GetBookListResponseForSearchSchema = createSelectSchema(book)
  .pick({
    description: true,
    id: true,
    name: true,
    nameRuby: true,
  })
  .extend({
    image: createSelectSchema(image).pick({
      alt: true,
      id: true,
    }),
  })
  .array();

export type GetBookListResponseForSearch = z.infer<typeof GetBookListResponseForSearchSchema>;
