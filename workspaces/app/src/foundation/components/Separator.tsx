import styled from 'styled-components';

const _Separator = styled.hr`
  border: none;
  height: 1px;
  background-color: #e9e9e9;
`;

export const Separator: React.FC = () => {
  return <_Separator />;
};
