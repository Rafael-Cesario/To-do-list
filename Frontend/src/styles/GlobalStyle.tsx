import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Inconsolata", 'Courier New', Courier, monospace;
  }

  body {
    background-color: #151515;
    color: #ddd;
    
    ::-webkit-scrollbar {
      background-color: #101010;
    }

    ::-webkit-scrollbar-thumb {
      background-color: #202020;
      border-radius: 3px;
    }
  }
`;
