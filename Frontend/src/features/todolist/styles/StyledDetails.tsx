import styled from 'styled-components';
import { colors } from '../../../styles/palette';

export const StyledDetails = styled.div`
  position: absolute;
  top: 10vh;
  left: 50vw;
  transform: translate(-50%, 0);

  background-color: ${colors.backgroundBlack};
  width: 90vw;
  max-width: 1000px;
  border-radius: 2px;
  overflow: hidden;

  animation: show 0.5s ease-out;
  @keyframes show {
    from {
      opacity: 0;
    }
  }

  button {
    outline: none;
    border: none;
    font-weight: bold;
    cursor: pointer;
    background-color: transparent;
    color: #ddd;
  }

  .tab {
    display: flex;
    justify-content: flex-end;
    background-color: ${colors.backgroundBlue};

    .close {
      padding: 5px 20px;
      font-size: 1rem;
      font-weight: bold;
      color: #ddd;
      cursor: pointer;

      :hover {
        background-color: ${colors.textRed};
        color: #ddd;
      }
    }
  }

  .details {
    padding: 2rem 4rem;

    h1,
    h2,
    input {
      font-size: 1rem;
    }

    textarea {
      width: 100%;
      outline: none;
      border: none;
      border-radius: 3px;
      margin: 0.5rem 0;
      color: #ddd;
    }

    .notes-area {
      padding: 1rem;
      background-color: #151515;
      min-height: 20vh;
      resize: vertical;

      ::-webkit-scrollbar {
        background-color: #333;
      }

      ::-webkit-scrollbar-thumb {
        background-color: #333;
      }
    }

    .task {
      color: #ddd;
      background-color: #151515;
      font-weight: bold;
      margin: 1rem 0;
      width: 100%;
      font-size: 1rem;
      resize: none;
      padding: 5px 20px;
      text-align: center;

      :focus {
        background-color: #151515;
      }

      ::-webkit-scrollbar {
        background-color: #202020;
      }

      ::-webkit-scrollbar-thumb {
        background-color: #ddd;
        border-radius: 2px;
      }
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
      padding: 10px 20px;
      border-radius: 2px;
      font-weight: bold;
      background-color: #151515;
    }

    button:first-child:hover {
      background-color: #ddd;
      color: #111;
    }

    button:last-child:hover {
      background-color: ${colors.textRed};
      color: #ddd;
    }
  }
`;
