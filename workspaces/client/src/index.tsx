// import './side-effects';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { SWRConfig } from 'swr';

// import { AdminApp } from '@wsh-2024/admin/src/index';
// import { ClientApp } from '@wsh-2024/app/src/index';

// import { preloadImages } from './utils/preloadImages';
import { registerServiceWorker } from './utils/registerServiceWorker';

const main = async () => {
  await registerServiceWorker();
  // await preloadImages();

  if (window.location.pathname.startsWith('/admin')) {
    const AdminApp = React.lazy(() => import('@wsh-2024/admin/src/index'));
    ReactDOM.createRoot(document.getElementById('root')!).render(<AdminApp />);
  } else {
    const ClientApp = React.lazy(() => import('@wsh-2024/app/src/index'));
    ReactDOM.hydrateRoot(
      document.getElementById('root')!,
      <SWRConfig value={{ revalidateIfStale: true, revalidateOnFocus: false, revalidateOnReconnect: false }}>
        <BrowserRouter>
          <ClientApp />
        </BrowserRouter>
      </SWRConfig>,
    );
  }
};

main().catch(console.error);
