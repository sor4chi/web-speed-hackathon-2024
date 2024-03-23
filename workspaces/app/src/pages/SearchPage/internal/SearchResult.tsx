import { Suspense } from 'react';

import { BookListItem } from '../../../features/book/components/BookListItem';
import { useBookSearch } from '../../../features/book/hooks/useBookSearch';
import { Flex } from '../../../foundation/components/Flex';
import { Text } from '../../../foundation/components/Text';
import { Color, Typography } from '../../../foundation/styles/variables';

type Props = {
  keyword: string;
};

const SerachResultList: React.FC<Props> = ({ keyword }) => {
  const { data: relatedBooks } = useBookSearch({
    query: {
      keyword,
    },
  });

  if (relatedBooks.length === 0) {
    return (
      <Text color={Color.MONO_100} typography={Typography.NORMAL14}>
        関連作品は見つかりませんでした
      </Text>
    );
  }

  return (
    <>
      {relatedBooks.map((book) => (
        <BookListItem key={book.id} book={book} />
      ))}
    </>
  );
};

export const SearchResult: React.FC<Props> = ({ keyword }) => {
  if (keyword === '') return null;
  return (
    <Flex align="center" as="ul" direction="column" justify="center">
      <Suspense
        fallback={
          <Text color={Color.MONO_100} typography={Typography.NORMAL14}>
            「{keyword}」を検索中...
          </Text>
        }
      >
        <SerachResultList keyword={keyword} />
      </Suspense>
    </Flex>
  );
};
