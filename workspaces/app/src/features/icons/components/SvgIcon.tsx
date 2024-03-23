import { ArrowBack, Close, Favorite, FavoriteBorder, NavigateNext, Search } from '@mui/icons-material';

type Props = {
  color: string;
  height: number;
  type: 'ArrowBack' | 'NavigateNext' | 'Close' | 'Favorite' | 'FavoriteBorder' | 'Search';
  width: number;
};

export const SvgIcon: React.FC<Props> = ({ color, height, type, width }) => {
  // eslint-disable-next-line
  const Icon = {
    ArrowBack: ArrowBack,
    Close: Close,
    Favorite: Favorite,
    FavoriteBorder: FavoriteBorder,
    NavigateNext: NavigateNext,
    Search: Search,
  }[type];
  return <Icon style={{ color, height, width }} />;
};
