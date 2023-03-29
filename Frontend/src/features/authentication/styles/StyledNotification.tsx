import styled from 'styled-components';
import { colors } from '../../../styles/themes';

export const StyledNotification = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  margin: 1rem;
  padding: 1rem;
  width: 30rem;
  max-width: 70vw;
  background-color: ${colors.backgroundBlack};
  background-color: #202020;
  animation: notification 0.3s ease-out both;
  z-index: 1;
  box-shadow: 5px 5px 2px #11111120;

  @keyframes notification {
    from {
      transform: translate(0, -10rem);
    }

    to {
      transform: translate(0, 0);
    }
  }

  .header {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    font-weight: bold;

    .type ::first-letter {
      text-transform: uppercase;
    }
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
    font-size: 1.1rem;
    padding: 5px 20px;

    :hover {
      background-color: ${colors.textRed};
    }
  }

  .error {
    color: #eb2626;
  }

  .success {
    color: forestgreen;
  }
`;
