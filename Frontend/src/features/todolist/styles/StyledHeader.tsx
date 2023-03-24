import styled from 'styled-components';
import { colors } from '../../../styles/palette';

export const StyledHeader = styled.header`
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  .title {
    font-size: 1.5rem;
    text-transform: capitalize;
  }

  .total-words {
    color: #aaa;
  }

  .configs {
    outline: none;
    border: none;
    padding: 5px 10px;
    border-radius: 3px;
    cursor: pointer;
    color: #ddd;
    background-color: ${colors.backgroundBlue};

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
    width: 100%;
    height: fit-content;
    color: #ddd;

    ::placeholder {
      color: #aaa;
    }
  }
`;
