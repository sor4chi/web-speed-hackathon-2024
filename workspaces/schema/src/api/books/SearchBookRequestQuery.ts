import { z } from 'zod';

export const SearchBookRequestQuerySchema = z.object({
  keyword: z.string(),
});

export type SearchBookRequestQuery = z.infer<typeof SearchBookRequestQuerySchema>;
