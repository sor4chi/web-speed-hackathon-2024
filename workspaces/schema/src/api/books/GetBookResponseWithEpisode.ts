import { createSelectSchema } from 'drizzle-zod';
import type { z } from 'zod';

import { author, book, episode, image } from '../../models';

export const GetBookResponseWithEpisodeSchema = createSelectSchema(book)
  .pick({
    description: true,
    id: true,
    name: true,
    nameRuby: true,
  })
  .extend({
    author: createSelectSchema(author)
      .pick({
        description: true,
        id: true,
        name: true,
      })
      .extend({
        image: createSelectSchema(image).pick({
          alt: true,
          id: true,
        }),
      }),
    episodes: createSelectSchema(episode)
      .pick({
        chapter: true,
        description: true,
        id: true,
        imageId: true,
        name: true,
      })
      .array(),
    image: createSelectSchema(image).pick({
      alt: true,
      id: true,
    }),
  });

export type GetBookResponseWithEpisode = z.infer<typeof GetBookResponseWithEpisodeSchema>;
