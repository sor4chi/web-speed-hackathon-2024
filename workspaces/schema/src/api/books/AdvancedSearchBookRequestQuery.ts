import { z } from 'zod';

export const AdvancedSearchBookRequestQuerySchema = z.object({
  authorId: z.string().optional(),
  authorName: z.string().optional(),
  bookId: z.string().optional(),
  bookName: z.string().optional(),
});

export type AdvancedSearchBookRequestQuery = z.infer<typeof AdvancedSearchBookRequestQuerySchema>;
