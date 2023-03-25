import styled from 'styled-components';
import { colors } from '../../../styles/palette';

export const StyledDetails = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  margin: 1rem;
  background-color: ${colors.backgroundBlack};
  min-height: 95vh;
  border-radius: 3px;
  overflow: hidden;
  animation: show 0.5s ease-out;
  width: 30vw;
  min-width: 350px;

  @keyframes show {
    from {
      opacity: 0;
    }
  }

  button {
    outline: none;
    border: none;
    background-color: transparent;
    color: #ddd;
    font-weight: bold;
    cursor: pointer;
  }

  .tab {
    background-color: ${colors.backgroundBlue};
    display: flex;
    justify-content: flex-end;
    padding: 5px 10px;

    .close {
      border: none;
      outline: none;
      background-color: transparent;
      font-size: 1.5rem;
      font-weight: bold;
      color: #ddd;
      cursor: pointer;

      :hover {
        color: #aa0050;
      }
    }
  }

  .details {
    padding: 2rem 4rem;

    h1,
    h2,
    input {
      font-size: 1rem;

      ::first-letter {
        text-transform: capitalize;
      }
    }

    textarea {
      width: 100%;
      outline: none;
      border: none;
      background-color: #222;
      border-radius: 3px;
      margin: 0.5rem 0;
      color: #ddd;
      padding: 1rem;
      resize: vertical;

      ::-webkit-scrollbar {
        background-color: #222;
      }

      ::-webkit-scrollbar-thumb {
        background-color: #333;
      }
    }

    .task {
      display: block;
      margin: 1rem 0;
      outline: none;
      border: none;
      background-color: transparent;
      color: #ddd;
      font-weight: bold;
    }

    .status {
      margin: 1rem 0;
      outline: none;
      border: none;
      background-color: transparent;
      color: #ddd;
      cursor: pointer;

      option {
        background-color: #151515;
        outline: none;
        border: none;
        color: #ddd;
      }
    }

    .container {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
    }

    .notes {
      margin: 3rem 0;
    }
  }

  .actions {
    display: flex;
    justify-content: space-between;

    button {
      width: 45%;
    }

    button:first-child {
      color: ${colors.textBlue};
    }

    button:last-child {
      color: ${colors.textRed};
    }
  }
`;
