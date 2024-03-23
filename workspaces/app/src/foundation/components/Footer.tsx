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
  text: string;
  title: string;
}

const Modal: React.FC<ModalProps> = ({ text, title }) => {
  const modalId = useId();

  return (
    <_Content aria-labelledby={modalId} role="dialog">
      <Text as="h2" color={Color.MONO_100} id={modalId} typography={Typography.NORMAL16}>
        {title}
      </Text>
      <Spacer height={Space * 1} />
      <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL12}>
        {text}
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
    const text = await fetchTextFromServer('/footer/term');
    updateDialogContent(<Modal text={text} title="利用規約" />);
  };

  const handleRequestToContactDialogOpen = async () => {
    const text = await fetchTextFromServer('/footer/contact');
    updateDialogContent(<Modal text={text} title="お問い合わせ" />);
  };

  const handleRequestToQuestionDialogOpen = async () => {
    const text = await fetchTextFromServer('/footer/question');
    updateDialogContent(<Modal text={text} title="Q&A" />);
  };

  const handleRequestToCompanyDialogOpen = async () => {
    const text = await fetchTextFromServer('/footer/company');
    updateDialogContent(<Modal text={text} title="運営会社" />);
  };

  const handleRequestToOverviewDialogOpen = async () => {
    const text = await fetchTextFromServer('/footer/overview');
    updateDialogContent(<Modal text={text} title="Cyber TOONとは" />);
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
