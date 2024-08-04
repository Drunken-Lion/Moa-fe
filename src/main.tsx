import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import {
  QueryProvider,
  RepositoryProvider
} from '@/shared/components/providers';

import './index.css';

const enableMocking = async () => {
  if (process.env.NODE_ENV !== 'dev') return;

  const { worker } = await import('@/mocks/browser');
  return worker.start();
};

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <RepositoryProvider>
        <QueryProvider>
          <App />
        </QueryProvider>
      </RepositoryProvider>
    </React.StrictMode>,
  );
});
