import { createGlobalStyle } from 'styled-components';
import { TypeThemeProps } from './themes';

export const GlobalStyle = createGlobalStyle<{ theme: TypeThemeProps }>`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Inconsolata", 'Courier New', Courier, monospace;
  }

  body {
    background-color: ${(props) => props.theme.backgroundColor};
    color: ${(props) => props.theme.color};

    ::-webkit-scrollbar {
      background-color: ${(props) => props.theme.backgroundColor};
    }

    ::-webkit-scrollbar-thumb {
      background-color: ${(props) => props.theme.backgroundColor};
      border-radius: 3px;
    }
  }
`;
