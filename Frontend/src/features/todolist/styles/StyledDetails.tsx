import styled from 'styled-components';
import { Theme } from '../../../styles/themes';

export const StyledDetails = styled.div`
  position: absolute;
  top: 10vh;
  left: 50vw;
  transform: translate(-50%, 0);

  background-color: ${(p: Theme) => p.theme.container};
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
    color: ${(p: Theme) => p.theme.color};
  }

  .tab {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${(p: Theme) => p.theme.primary};

    .title {
      font-size: 1rem;
      margin: 5px 10px;
    }

    .close {
      padding: 5px 20px;
      font-size: 1rem;
      font-weight: bold;
      color: ${(p: Theme) => p.theme.color};
      cursor: pointer;

      :hover {
        color: ${(p: Theme) => p.theme.color};
        background-color: ${(p: Theme) => p.theme.textError};
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
      color: ${(p: Theme) => p.theme.color};
    }

    .notes-area {
      padding: 1rem;
      background-color: ${(p: Theme) => p.theme.gray};
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
      background-color: ${(p: Theme) => p.theme.gray};
      color: ${(p: Theme) => p.theme.color};
      font-weight: bold;
      margin: 1rem 0;
      width: 100%;
      font-size: 1rem;
      resize: none;
      padding: 5px 20px;
      text-align: center;

      :focus {
        background-color: ${(p: Theme) => p.theme.backgroundColor};
      }

      ::-webkit-scrollbar {
        background-color: ${(p: Theme) => p.theme.container};
      }

      ::-webkit-scrollbar-thumb {
        background-color: ${(p: Theme) => p.theme.color};
        border-radius: 2px;
      }
    }

    .status {
      margin: 1rem 0;
      outline: none;
      border: none;
      background-color: transparent;
      color: ${(p: Theme) => p.theme.color};
      cursor: pointer;

      option {
        background-color: ${(p: Theme) => p.theme.container};
        color: ${(p: Theme) => p.theme.color};
        outline: none;
        border: none;
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
      background-color: ${(p: Theme) => p.theme.gray};
      transition: 0.2s;
    }

    button:first-child:hover {
      background-color: ${(p: Theme) => p.theme.color};
      color: ${(p: Theme) => p.theme.backgroundColor};
    }

    button:last-child:hover {
      background-color: ${(p: Theme) => p.theme.textError};
      color: ${(p: Theme) => p.theme.color};
    }
  }
`;
