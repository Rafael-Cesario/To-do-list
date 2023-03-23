import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './Routes';
import { RouterProvider } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { client } from './client';
import { Provider } from 'react-redux';
import { store } from './features/authentication/utils/store';
import { GlobalStyle } from './styles/GlobalStyle';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <GlobalStyle />
        <RouterProvider router={Router} />
      </Provider>
    </ApolloProvider>
  </React.StrictMode>
);
