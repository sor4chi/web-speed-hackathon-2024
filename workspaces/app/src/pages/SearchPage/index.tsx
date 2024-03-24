import { useCallback, useEffect, useId, useState } from 'react';
import { useDebounce } from 'react-use';

import { Box } from '../../foundation/components/Box';
import { Text } from '../../foundation/components/Text';
import { Color, Space, Typography } from '../../foundation/styles/variables';

import { Input } from './internal/Input';
import { SearchResult } from './internal/SearchResult';

const SearchPage: React.FC = () => {
  const searchResultsA11yId = useId();

  const [isClient, setIsClient] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [delayedKeyword, setDelayedKeyword] = useState('');

  useDebounce(
    () => {
      setDelayedKeyword(keyword);
    },
    500,
    [keyword],
  );

  const onChangedInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setKeyword(event.target.value);
    },
    [setKeyword],
  );

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Box px={Space * 2}>
      <Input disabled={!isClient} onChange={onChangedInput} />
      <Box aria-labelledby={searchResultsA11yId} as="section" maxWidth="100%" py={Space * 2} width="100%">
        <Text color={Color.MONO_100} id={searchResultsA11yId} typography={Typography.NORMAL20} weight="bold">
          検索結果
        </Text>
        <SearchResult keyword={delayedKeyword} />
      </Box>
    </Box>
  );
};

export { SearchPage };
