import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMount } from 'react-use';
import type { RouteParams } from 'regexparam';
import invariant from 'tiny-invariant';

import type { GetBookResponseWithEpisode } from '@wsh-2024/schema/src/api/books/GetBookResponseWithEpisode';

import { EpisodeListItemWithEpisodeData } from '../../features/episode/components/EpisodeListItem';
import { Box } from '../../foundation/components/Box';
import { Flex } from '../../foundation/components/Flex';
import { Separator } from '../../foundation/components/Separator';
import { Space } from '../../foundation/styles/variables';

import { ComicViewer } from './internal/ComicViewer';

const EpisodeDetailPage: React.FC = () => {
  const { bookId, episodeId } = useParams<RouteParams<'/books/:bookId/episodes/:episodeId'>>();
  invariant(bookId);
  invariant(episodeId);

  const [book, setBook] = useState<GetBookResponseWithEpisode>();

  useMount(async () => {
    if (book == null) {
      setBook((window as any).__BLOG_INJECTED_DATA__);
    } else {
      const res = await fetch(`/api/v1/books-with-episode/${bookId}`);
      const json = await res.json();
      setBook(json);
    }
  });

  if (book == null) return null;

  return (
    <Box>
      <section aria-label="漫画ビューアー">
        <ComicViewer episodeId={episodeId} />
      </section>

      <Separator />

      <Box aria-label="エピソード一覧" as="section" px={Space * 2}>
        <Flex align="center" as="ul" direction="column" justify="center">
          {book.episodes.map((episode) => (
            <EpisodeListItemWithEpisodeData key={episode.id} bookId={bookId} episode={episode} />
          ))}
        </Flex>
      </Box>
    </Box>
  );
};

export { EpisodeDetailPage };
