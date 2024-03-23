import { Dialog } from './foundation/components/Dialog';
import { GlobalStyle } from './foundation/styles/GlobalStyle';
import { Router } from './routes';

const ClientApp: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <Dialog />
      <Router />
    </>
  );
};

export default ClientApp;
