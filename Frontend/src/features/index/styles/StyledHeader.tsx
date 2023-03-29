import styled from 'styled-components';
import { colors } from '../../../styles/themes';

export const StyledHeader = styled.div`
  width: 100%;

  .tab {
    display: block;
    background-color: ${colors.backgroundBlue};
    width: 100%;
    height: 2rem;
    margin-bottom: 1rem;
  }

  button {
    border: none;
    outline: none;
    background-color: transparent;
    color: #ddd;
    font-weight: bold;
    margin-bottom: 1rem;
    cursor: pointer;
    padding: 5px 10px;
    border-radius: 3px;

    :hover {
      background-color: ${colors.backgroundBlue};
    }
  }

  .menu {
    display: flex;
    flex-wrap: wrap;
    margin: 0 5rem;
    justify-content: space-between;

    .buttons {
      display: flex;
      flex-wrap: wrap;
    }
  }

  .search {
    outline: none;
    border: none;
    background-color: ${colors.backgroundBlack};
    color: white;
    padding: 5px 10px;
    min-width: 30%;

    ::placeholder {
      color: #aaa;
    }
  }

  .perfil {
    margin-right: 1rem;
  }
`;
