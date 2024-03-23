import React from 'react';
import styled from 'styled-components';

import { BreakPoint, Color } from '../styles/variables';

// const _Container = styled.div`
const _Container = ({ minHeight }: { minHeight?: string }) => styled.div`
  min-height: ${minHeight ?? '100vh'};
  width: 100%;
  margin: 0 auto;
  max-width: ${BreakPoint.MOBILE}px;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: auto 1fr auto;
  background-color: ${Color.MONO_A};
  border-left: 1px solid ${Color.MONO_30};
  border-right: 1px solid ${Color.MONO_30};
`;

type Props = {
  children: React.ReactNode;
  minHeight?: string;
};

export const Container: React.FC<Props> = ({ children, minHeight }) => {
  const __Container = _Container({ minHeight });
  return <__Container>{children}</__Container>;
};
