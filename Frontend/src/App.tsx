import { createGlobalStyle } from 'styled-components';

const App = () => {
  return (
    <>
      <GlobalStyle />
      <h1>To do list full stack</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, nostrum perferendis dolore
        inventore consequatur tempora neque sint sed id esse assumenda beatae maiores optio aut
        dolores eum quibusdam veritatis! Consequuntur!
      </p>
    </>
  );
};

export default App;

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Inconsolata", 'Courier New', Courier, monospace;
  }

  body {
    background-color: #101010;
    color: #ddd;
    margin: 1rem;
  }
`;
