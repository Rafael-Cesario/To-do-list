import styled from 'styled-components';
import { colors } from '../../../styles/palette';

export const StyledCreateNewList = styled.div`
  justify-self: center;
  grid-column: 1 / span 3;
  height: fit-content;
  background-color: ${colors.backgroundBlack};
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem;
  margin-top: 2rem;
  width: 100%;
  max-width: 800px;
  animation: show 0.2s both;

  @keyframes show {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  .title {
    position: absolute;
    transform: translate(0, -4rem);
    background-color: ${colors.backgroundBlue};
    font-size: 1.1rem;
    padding: 5px 10px;
    border-radius: 3px;
  }

  .list-name {
    outline: none;
    border: none;
    border-bottom: 2px solid ${colors.backgroundBlue};
    background-color: transparent;
    padding: 2px 10px;
    margin-bottom: 2rem;
    color: #ddd;
    font-weight: bold;
    width: 50%;

    ::placeholder {
      color: #bbb;
    }
  }

  .buttons {
    width: 100%;
    display: flex;
    justify-content: space-evenly;

    button {
      border: none;
      outline: none;
      background-color: transparent;
      cursor: pointer;
      color: #aaa;
      font-weight: bold;

      :hover {
        color: #ddd;
      }
    }
  }
`;
