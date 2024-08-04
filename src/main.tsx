import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import {
  QueryProvider,
  RepositoryProvider
} from '@/shared/components/providers';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RepositoryProvider>
      <QueryProvider>
        <App />
      </QueryProvider>
    </RepositoryProvider>
  </React.StrictMode>,
);
