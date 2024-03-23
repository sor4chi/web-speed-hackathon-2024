import type { ComponentProps } from 'react';
import { Link as RouterLink } from 'react-router-dom';

type Props = Omit<ComponentProps<typeof RouterLink>, 'to'> &
  (
    | {
        href: string;
        to?: never;
      }
    | {
        href?: never;
        to: string;
      }
  );

export const Link: React.FC<Props> = ({ children, href, to, ...rest }) => {
  return (
    <RouterLink to={href || to || ''} {...rest}>
      {children}
    </RouterLink>
  );
};
