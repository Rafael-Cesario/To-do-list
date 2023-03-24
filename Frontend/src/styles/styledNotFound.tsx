import styled from 'styled-components';

export const StyledNotFound = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90vh;

  h1 {
    font-size: 10rem;
    color: dodgerblue;
  }

  button {
    margin: 2rem 0;
    border: none;
    outline: none;
    background-color: dodgerblue;
    padding: 0.5rem 3rem;
    text-decoration: none;
    color: #111;
    font-weight: bold;
    border-radius: 3px;
  }
`;
