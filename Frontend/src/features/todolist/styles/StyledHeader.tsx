import styled from 'styled-components';
import { colors } from '../../../styles/palette';

export const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;

  margin: 2rem 5rem;

  .title {
    font-size: 1.5rem;
    text-transform: capitalize;
  }

  .total-words {
    color: #aaa;
  }

  .configs,
  a {
    margin-right: 1rem;
    font-size: 0.8rem;
    text-decoration: none;
    outline: none;
    border: none;
    padding: 5px 10px;
    border-radius: 3px;
    cursor: pointer;
    color: #ddd;
    background-color: ${colors.backgroundBlack};

    :hover {
      color: #111;
      background-color: #ddd;
    }
  }

  .menu {
    display: flex;
    align-items: center;
  }

  .search {
    outline: none;
    border: none;
    background-color: ${colors.backgroundBlack};
    padding: 5px 20px;
    width: 30vw;
    min-width: 100px;
    max-width: 500px;
    height: fit-content;
    color: #ddd;

    ::placeholder {
      color: #aaa;
    }
  }
`;
