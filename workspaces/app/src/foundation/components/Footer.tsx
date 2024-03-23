import { useSetAtom } from 'jotai';
import React, { useId } from 'react';
import styled from 'styled-components';

import { DialogContentAtom } from '../atoms/DialogContentAtom';
import { Color, Space, Typography } from '../styles/variables';

import { Box } from './Box';
import { Button } from './Button';
import { Flex } from './Flex';
import { Spacer } from './Spacer';
import { Text } from './Text';

const _Button = styled(Button)`
  color: ${Color.MONO_A};
`;

const _Content = styled.section`
  white-space: pre-line;
`;

const fetchTextFromServer = async (url: string) => {
  const response = await fetch(url);
  const text = await response.text();
  return text;
};

interface ModalProps {
  title: string;
  url: string;
}

const Modal: React.FC<ModalProps> = ({ title, url }) => {
  const modalId = useId();
  const [TEXT, setTEXT] = React.useState('Loading...');

  React.useEffect(() => {
    fetchTextFromServer(url).then(setTEXT);
  }, []);

  return (
    <_Content aria-labelledby={modalId} role="dialog">
      <Text as="h2" color={Color.MONO_100} id={modalId} typography={Typography.NORMAL16}>
        {title}
      </Text>
      <Spacer height={Space * 1} />
      <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL12}>
        {TEXT}
      </Text>
    </_Content>
  );
};

export const Footer: React.FC = () => {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const updateDialogContent = useSetAtom(DialogContentAtom);

  const handleRequestToTermDialogOpen = async () => {
    updateDialogContent(<Modal title="利用規約" url="/footer/term" />);
  };

  const handleRequestToContactDialogOpen = async () => {
    updateDialogContent(<Modal title="お問い合わせ" url="/footer/contact" />);
  };

  const handleRequestToQuestionDialogOpen = async () => {
    updateDialogContent(<Modal title="Q&A" url="/footer/question" />);
  };

  const handleRequestToCompanyDialogOpen = async () => {
    updateDialogContent(<Modal title="運営会社" url="/footer/company" />);
  };

  const handleRequestToOverviewDialogOpen = async () => {
    updateDialogContent(<Modal title="Cyber TOONとは" url="/footer/overview" />);
  };

  return (
    <Box as="footer" backgroundColor={Color.Background} p={Space * 1}>
      <Flex align="flex-start" direction="column" gap={Space * 1} justify="flex-start">
        <img alt="Cyber TOON" src="/assets/cyber-toon.svg" />
        <Flex align="start" direction="row" gap={Space * 1.5} justify="center">
          <_Button disabled={!isClient} onClick={handleRequestToTermDialogOpen}>
            利用規約
          </_Button>
          <_Button disabled={!isClient} onClick={handleRequestToContactDialogOpen}>
            お問い合わせ
          </_Button>
          <_Button disabled={!isClient} onClick={handleRequestToQuestionDialogOpen}>
            Q&A
          </_Button>
          <_Button disabled={!isClient} onClick={handleRequestToCompanyDialogOpen}>
            運営会社
          </_Button>
          <_Button disabled={!isClient} onClick={handleRequestToOverviewDialogOpen}>
            Cyber TOONとは
          </_Button>
        </Flex>
      </Flex>
    </Box>
  );
};
