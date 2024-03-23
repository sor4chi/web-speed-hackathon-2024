import { createSelectSchema } from 'drizzle-zod';
import type { z } from 'zod';

import { author, book, image } from '../../models';

export const AdvancedSearchBookResponseSchema = createSelectSchema(book)
  .pick({
    description: true,
    id: true,
    name: true,
    nameRuby: true,
  })
  .extend({
    author: createSelectSchema(author).pick({
      id: true,
      name: true,
    }),
    image: createSelectSchema(image).pick({
      alt: true,
      id: true,
    }),
  })
  .array();

export type AdvancedSearchBookResponse = z.infer<typeof AdvancedSearchBookResponseSchema>;
