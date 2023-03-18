import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './Routes';
import { RouterProvider } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { client } from './client';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={Router} />
    </ApolloProvider>
  </React.StrictMode>
);
