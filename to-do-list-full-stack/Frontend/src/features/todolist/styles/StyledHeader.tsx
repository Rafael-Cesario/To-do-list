import styled from 'styled-components';
import { Theme } from '../../../styles/themes';

export const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  margin: 2rem 3rem;

  .title {
    font-size: 1.5rem;
    text-transform: capitalize;
  }

  .total-words {
    color: ${(p: Theme) => p.theme.faded};
    font-weight: normal;
    font-size: 0.9rem;
  }

  a {
    margin-right: 1rem;
    font-size: 0.8rem;
    text-decoration: none;
    outline: none;
    border: none;
    padding: 5px 20px;
    cursor: pointer;
    font-weight: bold;
    color: ${(p: Theme) => p.theme.textContainer};
    background-color: ${(p: Theme) => p.theme.container};
    border-radius: 2px;

    :hover {
      background-color: ${(p: Theme) => p.theme.primary};
      color: ${(p: Theme) => p.theme.textPrimary};
    }
  }

  .menu {
    display: flex;
    align-items: center;
  }

  .search {
    outline: none;
    border: none;
    background-color: ${(p: Theme) => p.theme.container};
    padding: 5px 20px;
    width: 30vw;
    min-width: 100px;
    max-width: 500px;
    height: fit-content;
    color: ${(p: Theme) => p.theme.textContainer};
    border-radius: 2px;

    ::placeholder {
      color: ${(p: Theme) => p.theme.fadedContainer};
    }
  }
`;
