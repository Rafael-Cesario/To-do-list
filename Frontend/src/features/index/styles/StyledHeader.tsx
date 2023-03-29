import styled from 'styled-components';
import { TypeThemeProps } from '../../../styles/themes';

type Theme = { theme: TypeThemeProps };

export const StyledHeader = styled.div`
  width: 100%;

  button {
    outline: none;
    font-weight: bold;
    margin: 0 0.5rem;
    height: fit-content;
    cursor: pointer;
    padding: 5px 10px;
    border-radius: 3px;
    border: none;
    background-color: ${(p: Theme) => p.theme.container};
    color: ${(p: Theme) => p.theme.color};

    :hover {
      background-color: ${(p: Theme) => p.theme.color};
      color: ${(p: Theme) => p.theme.backgroundColor};
    }
  }

  .menu {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 2rem;

    .buttons {
      display: flex;
      flex-wrap: wrap;
    }
  }

  .search {
    outline: none;
    color: ${(p: Theme) => p.theme.color};
    padding: 5px 10px;
    min-width: 30%;
    border-radius: 3px;
    border: none;
    background-color: ${(p: Theme) => p.theme.container};

    ::placeholder {
      color: ${(p: Theme) => p.theme.faded};
    }
  }

  .perfil {
    margin-right: 1rem;
  }
`;
