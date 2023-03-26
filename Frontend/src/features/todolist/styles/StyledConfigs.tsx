import styled from 'styled-components';
import { colors } from '../../../styles/palette';

export const StyledConfigs = styled.div`
  button,
  input {
    outline: none;
    border: none;
    padding: 5px 20px;
    font-weight: bold;
    cursor: pointer;
  }

  .open-close {
    background-color: ${colors.backgroundBlack};
    margin-right: 1rem;
    font-weight: bold;
    border-radius: 2px;
    color: #ddd;
    cursor: pointer;

    :hover {
      background-color: #ddd;
      color: #222;
    }
  }

  .configs {
    width: 90vw;
    height: 80vh;
    position: absolute;
    top: 50vh;
    left: 50vw;
    transform: translate(-50%, -50%);
    z-index: 1;

    display: flex;
    flex-direction: column;
    align-items: center;

    background-color: ${colors.backgroundBlack};
    border-radius: 2px;
    overflow: hidden;

    .tab {
      background-color: ${colors.backgroundBlue};
      display: flex;
      justify-content: flex-end;
      width: 100%;

      .close {
        background-color: transparent;
        color: #ddd;
        font-size: 1rem;
        cursor: pointer;

        :hover {
          background-color: ${colors.textRed};
          color: #ddd;
        }
      }
    }

    .title {
      text-align: center;
      font-size: 1.2rem;
      margin: 2rem 0 5rem 0;
    }

    span,
    input,
    .actions {
      width: 50%;
    }

    span {
      color: #aaa;
      font-weight: bold;
      font-size: 0.8rem;
      display: block;
      text-align: start;
      padding: 0 20px;
      margin-bottom: 5px;
    }

    input {
      color: #ddd;
      background-color: transparent;
      margin-bottom: 2rem;
      border-radius: 2px;
      font-size: 1rem;

      :focus {
        background-color: #333;
      }
    }
  }

  .actions {
    margin: 5rem 0;
    display: flex;
    justify-content: space-between;

    button {
      background-color: #333;
      border-radius: 2px;
      color: #ddd;
      height: fit-content;
    }

    button:first-child:hover {
      background-color: #ddd;
      color: #111;
    }

    button:last-child {
      background-color: ${colors.textRed};
      color: #ddd;
    }
  }

  .confirm-delete {
    margin-left: 1rem;
    text-align: start;

    p {
      margin: 0.5rem 0;
    }
  }
`;
