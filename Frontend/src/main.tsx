import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './Routes';
import { RouterProvider } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { client } from './client';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './utils/store';
import { GlobalStyle } from './styles/GlobalStyle';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ReduxProvider store={store}>
        <RouterProvider router={Router} />
        <GlobalStyle />
      </ReduxProvider>
    </ApolloProvider>
  </React.StrictMode>
);
