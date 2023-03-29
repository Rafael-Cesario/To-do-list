import styled from 'styled-components';
import { colors } from '../../../styles/themes';

export const StyledHeader = styled.header`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin: 2rem;

  button {
    padding: 0.3rem 1rem;
    cursor: pointer;
    background-color: transparent;
    outline: none;
    border: none;
    color: #ddd;
    font-weight: bold;
    transition: 0.2s;
    border-radius: 3px;
    box-shadow: 5px 5px 2px #111;

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
