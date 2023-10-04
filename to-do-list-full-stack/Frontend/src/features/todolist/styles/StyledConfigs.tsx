import styled from 'styled-components';
import { Theme } from '../../../styles/themes';

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
    background-color: ${(p: Theme) => p.theme.container};
    color: ${(p: Theme) => p.theme.textContainer};
    margin-right: 1rem;
    font-weight: bold;
    border-radius: 2px;
    cursor: pointer;

    :hover {
      background-color: ${(p: Theme) => p.theme.primary};
      color: ${(p: Theme) => p.theme.textPrimary};
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

    background-color: ${(p: Theme) => p.theme.container};
    border-radius: 2px;
    overflow: hidden;

    .tab {
      background-color: ${(p: Theme) => p.theme.primary};
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;

      .close {
        background-color: transparent;
        color: ${(p: Theme) => p.theme.textPrimary};
        font-size: 1rem;
        cursor: pointer;

        :hover {
          background-color: ${(p: Theme) => p.theme.textError};
          color: ${(p: Theme) => p.theme.textPrimary};
        }
      }
    }

    .title {
      text-align: center;
      font-size: 1rem;
      margin: 5px 20px;
      color: ${(p: Theme) => p.theme.textPrimary};
    }

    span,
    input,
    .actions {
      width: 50%;
    }

    span {
      color: ${(p: Theme) => p.theme.fadedContainer};
      font-weight: normal;
      font-size: 0.8rem;
      display: block;
      text-align: start;
      padding: 0 20px;
      margin-bottom: 5px;
    }

    input {
      color: ${(p: Theme) => p.theme.textContainer};
      margin-bottom: 2rem;
      border-radius: 2px;
      font-size: 1rem;
      font-weight: normal;
      background-color: ${(p: Theme) => p.theme.gray};
    }
  }

  .config {
    margin: 5rem 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .actions {
    margin: 5rem 0;
    display: flex;
    justify-content: space-between;

    button {
      background-color: ${(p: Theme) => p.theme.gray};
      border-radius: 2px;
      color: ${(p: Theme) => p.theme.textContainer};
      height: fit-content;
    }

    button:first-child:hover {
      background-color: ${(p: Theme) => p.theme.primary};
      color: ${(p: Theme) => p.theme.textPrimary};
    }

    button:last-child {
      background-color: ${(p: Theme) => p.theme.textError};
      color: ${(p: Theme) => p.theme.textPrimary};
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
