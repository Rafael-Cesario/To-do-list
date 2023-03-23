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
  animation: notification 0.3s ease-out both;

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

    :hover {
      transform: scale(1.5);
    }
  }

  .error {
    color: #eb2626;
  }

  .success {
    color: forestgreen;
  }
`;
