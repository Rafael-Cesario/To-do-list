import styled from 'styled-components';
import { TypeThemeProps } from '../../../styles/themes';

type Theme = { theme: TypeThemeProps };

export const StyledPerfil = styled.div`
  .container {
    position: absolute;
    top: 50vh;
    left: 50vw;
    transform: translate(-50%, -50%);
    width: 90vw;
    min-height: 80vh;
    background-color: ${(p: Theme) => p.theme.container};
    overflow: hidden;
    border-radius: 2px;

    display: flex;
    flex-direction: column;
    align-items: center;

    animation: show 0.5s;
    @keyframes show {
      from {
        opacity: 0;
        top: 10vh;
      }
    }

    .perfil-tab {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      align-items: center;
      background-color: ${(p: Theme) => p.theme.primary};

      .title {
        font-size: 1rem;
        margin: 5px 20px;
      }

      .perfil-close {
        border: none;
        outline: none;
        margin: 0;
        padding: 5px 20px;
        border-radius: 0;
        background-color: transparent;

        :hover {
          background-color: ${(p: Theme) => p.theme.textError};
          color: ${(p: Theme) => p.theme.color};
        }
      }
    }

    .title {
      margin: 2rem 0;
      font-size: 1.2rem;
    }

    span,
    input {
      padding: 5px 10px;
      font-weight: bold;
      width: 50%;
      background-color: transparent;
      border: none;
      outline: none;
      color: ${(p: Theme) => p.theme.color};
    }

    span {
      display: block;
      margin-bottom: 0.2rem;
      font-size: 0.8rem;
      color: ${(p: Theme) => p.theme.faded};
      font-weight: normal;
    }

    .input-text {
      margin-bottom: 1rem;
      outline: none;
      border: none;
      border-radius: 2px;
      background-color: transparent;
      border-bottom: 2px solid ${(p: Theme) => p.theme.textPrimary};
    }

    .password {
      width: 50%;
      display: flex;
      flex-direction: column;
      margin-bottom: 1rem;
      border-bottom: 2px solid ${(p: Theme) => p.theme.textPrimary};

      img {
        cursor: pointer;
      }

      div {
        padding-right: 10px;
        display: flex;
        justify-content: center;
        align-items: center;

        input {
          width: 100%;
          margin: 0;
        }
      }
    }

    .actions {
      display: flex;
      justify-content: space-between;
      width: 50%;
      margin-top: 2rem;

      button {
        background-color: ${(p: Theme) => p.theme.gray};
        padding: 5px 20px;
        width: 45%;
        border: none;
      }

      button:first-child:hover {
        background-color: ${(p: Theme) => p.theme.color};
        color: ${(p: Theme) => p.theme.container};
        border: none;
      }

      button:last-child:hover {
        border: none;
        background-color: ${(p: Theme) => p.theme.textError};
        color: ${(p: Theme) => p.theme.color};
      }
    }
  }
`;
