import styled from 'styled-components';
import { colors } from '../../../styles/palette';

export const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  margin: 2rem 3rem;

  .title {
    font-size: 1.5rem;
    text-transform: capitalize;
  }

  .total-words {
    color: #555;
    font-weight: bold;
  }

  .configs,
  a {
    margin-right: 1rem;
    font-size: 0.8rem;
    text-decoration: none;
    outline: none;
    border: none;
    padding: 5px 20px;
    cursor: pointer;
    font-weight: bold;
    color: #ddd;
    background-color: ${colors.backgroundBlack};
    border-radius: 2px;

    :hover {
      color: #ddd;
      background-color: #005090;
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
    border-radius: 2px;

    ::placeholder {
      color: #aaa;
    }
  }
`;
