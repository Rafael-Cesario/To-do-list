import styled from 'styled-components';
import { colors } from '../../../styles/palette';

export const StyledPerfil = styled.div`
  .container {
    position: absolute;
    top: 50vh;
    left: 50vw;
    transform: translate(-50%, -50%);
    width: 90vw;
    min-height: 80vh;
    background-color: ${colors.backgroundBlack};
    overflow: hidden;
    border-radius: 2px;

    display: flex;
    flex-direction: column;
    align-items: center;

    .perfil-tab {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      background-color: ${colors.backgroundBlue};

      .perfil-close {
        margin: 0;
        padding: 5px 20px;
        border-radius: 0;

        :hover {
          background-color: ${colors.textRed};
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
    }

    span {
      display: block;
      margin-bottom: 0.2rem;
      font-size: 0.8rem;
    }

    input {
      margin-bottom: 1rem;
      outline: none;
      border: none;
      background-color: #303030;
      color: #ddd;
    }

    .password {
      width: 50%;
      display: flex;
      flex-direction: column;
      margin-bottom: 1rem;

      img {
        cursor: pointer;
      }

      div {
        padding-right: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #303030;

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
        background-color: #303030;
        padding: 5px 20px;
        width: 45%;
      }

      button:first-child:hover {
        background-color: #ddd;
        color: #111;
      }

      button:last-child:hover {
        background-color: ${colors.textRed};
      }
    }
  }
`;
