import styled from 'styled-components';
import { colors } from '../../../styles/palette';

export const StyledHeader = styled.header`
  display: flex;
  justify-content: flex-end;
  margin: 2rem;

  button {
    padding: 0.3rem 2rem;
    cursor: pointer;
    background-color: transparent;
    outline: none;
    border: none;
    color: #ddd;
    font-weight: bold;
    transition: 0.2s;

    :hover {
      background-color: ${colors.backgroundBlue};
    }

    :active {
      transform: scale(0.95);
    }
  }

  .active {
    background-color: ${colors.backgroundBlue};
  }
`;
