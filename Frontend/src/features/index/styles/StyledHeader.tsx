import styled from 'styled-components';
import { colors } from '../../../styles/palette';

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
    margin: 0 5rem;
  }

  .search {
    outline: none;
    border: none;
    background-color: ${colors.backgroundBlack};
    color: white;
    padding: 5px 10px;
    min-width: 30%;
    float: right;

    ::placeholder {
      color: #aaa;
    }
  }

  .perfil {
    margin-right: 1rem;
  }
`;
