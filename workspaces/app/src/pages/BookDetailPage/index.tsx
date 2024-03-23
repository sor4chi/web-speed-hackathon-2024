import { useAtom } from 'jotai/react';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { RouteParams } from 'regexparam';
import { styled } from 'styled-components';
import invariant from 'tiny-invariant';

import type { GetBookResponseWithEpisode } from '@wsh-2024/schema/src/api/books/GetBookResponseWithEpisode';

import { FavoriteBookAtomFamily } from '../../features/book/atoms/FavoriteBookAtomFamily';
import { EpisodeListItemWithEpisodeData } from '../../features/episode/components/EpisodeListItem';
import { Box } from '../../foundation/components/Box';
import { Flex } from '../../foundation/components/Flex';
import { Image } from '../../foundation/components/Image';
import { Link } from '../../foundation/components/Link';
import { Separator } from '../../foundation/components/Separator';
import { Spacer } from '../../foundation/components/Spacer';
import { Text } from '../../foundation/components/Text';
import { Color, Space, Typography } from '../../foundation/styles/variables';

import { BottomNavigator } from './internal/BottomNavigator';

const _HeadingWrapper = styled.section`
  display: grid;
  align-items: start;
  grid-template-columns: auto 1fr;
  padding-bottom: ${Space * 2}px;
  gap: ${Space * 2}px;
`;

const _AuthorWrapper = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  gap: ${Space * 1}px;
`;

const _AvatarWrapper = styled.div`
  width: 32px;
  height: 32px;
  > img {
    border-radius: 50%;
  }
`;

const BookDetailPage: React.FC = () => {
  const { bookId } = useParams<RouteParams<'/books/:bookId'>>();
  invariant(bookId);

  const [book, setBook] = useState<GetBookResponseWithEpisode>();

  useEffect(() => {
    const injectedData = (window as any).__BLOG_INJECTED_DATA__;
    if (book == null && injectedData != null && bookId === injectedData.id) {
      setBook(injectedData);
    } else {
      const res = fetch(`/api/v1/books-with-episode/${bookId}`);
      res.then((res) => res.json()).then((json) => setBook(json));
    }
  }, [bookId]);

  const [isFavorite, toggleFavorite] = useAtom(FavoriteBookAtomFamily(bookId));

  const handleFavClick = useCallback(() => {
    toggleFavorite();
  }, [toggleFavorite]);

  if (book == null) return null;

  const latestEpisode = book.episodes?.find((episode) => episode.chapter === 1);
  const bookImageUrl = `/images/${book.image.id}?format=webp&width=192&height=256`;
  const auhtorImageUrl = `/images/${book.author.image.id}?format=webp&width=32&height=32`;

  return (
    <Box height="100%" position="relative" px={Space * 2}>
      <_HeadingWrapper aria-label="作品情報">
        {bookImageUrl != null && (
          <Image alt={book.name} height={256} loading="eager" objectFit="cover" src={bookImageUrl} width={192} />
        )}
        <Flex align="flex-start" direction="column" gap={Space * 1} justify="flex-end">
          <Box>
            <Text color={Color.MONO_100} typography={Typography.NORMAL20} weight="bold">
              {book.name}
            </Text>
            <Spacer height={Space * 1} />
            <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL14}>
              {book.description}
            </Text>
          </Box>

          <Spacer height={Space * 1} />

          <_AuthorWrapper href={`/authors/${book.author.id}`}>
            {auhtorImageUrl != null && (
              <_AvatarWrapper>
                <Image
                  alt={book.author.name}
                  height={32}
                  loading="eager"
                  objectFit="cover"
                  src={auhtorImageUrl}
                  width={32}
                />
              </_AvatarWrapper>
            )}
            <Text color={Color.MONO_100} typography={Typography.NORMAL14}>
              {book.author.name}
            </Text>
          </_AuthorWrapper>
        </Flex>
      </_HeadingWrapper>

      <BottomNavigator
        bookId={bookId}
        isFavorite={isFavorite}
        latestEpisodeId={latestEpisode?.id ?? ''}
        onClickFav={handleFavClick}
      />

      <Separator />

      <section aria-label="エピソード一覧">
        <Flex align="center" as="ul" direction="column" justify="center">
          {book.episodes.map((episode) => (
            <EpisodeListItemWithEpisodeData key={episode.id} bookId={bookId} episode={episode} />
          ))}
          {book.episodes.length === 0 && (
            <>
              <Spacer height={Space * 2} />
              <Text color={Color.MONO_100} typography={Typography.NORMAL14}>
                この作品はまだエピソードがありません
              </Text>
            </>
          )}
        </Flex>
      </section>
    </Box>
  );
};

export { BookDetailPage };
