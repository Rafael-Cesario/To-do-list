import styled from 'styled-components';
import { colors } from '../../../styles/palette';

export const StyledNotification = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  margin: 1rem;
  padding: 1rem;
  background-color: ${colors.backgroundBlack};
  min-width: 30vw;

  .header {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    font-weight: bold;
  }

  .text {
    margin-top: 0.5rem;
    color: #aaa;
  }

  .close {
    border: none;
    outline: none;
    background-color: transparent;
    color: #ddd;
    cursor: pointer;
    transition: 0.1s ease-in;

    :hover {
      transform: scale(1.5);
    }
  }

  .error {
    color: crimson;
  }
`;
