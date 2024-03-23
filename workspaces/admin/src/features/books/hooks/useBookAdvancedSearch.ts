import { useQuery } from '@tanstack/react-query';

import { bookApiClient } from '../apiClient/bookApiClient';

export const useBookAdvancedSearch = ({
  authorId,
  authorName,
  bookId,
  bookName,
}: {
  authorId?: string;
  authorName?: string;
  bookId?: string;
  bookName?: string;
}) => {
  return useQuery({
    queryFn: async ({ queryKey: [, options] }) => {
      return bookApiClient.advancedSearch(options);
    },
    queryKey: bookApiClient.advancedSearch$$key({
      query: {
        authorId,
        authorName,
        bookId,
        bookName,
      },
    }),
  });
};
