import styled from 'styled-components';
import { colors } from '../../../styles/palette';

export const StyledHeader = styled.div`
  grid-column: 1/span 3;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

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
