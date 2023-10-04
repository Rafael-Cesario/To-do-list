import Router from './Routes';
import { RouterProvider } from 'react-router-dom';
import { GlobalStyle } from './styles/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import { useSelector } from 'react-redux';
import { Store } from './utils/store';
import { theme } from './styles/themes';

export const App = () => {
  const { theme: palette } = useSelector((state: Store) => state.theme);

  return (
    <ThemeProvider theme={theme[palette]}>
      <RouterProvider router={Router} />
      <GlobalStyle />
    </ThemeProvider>
  );
};
