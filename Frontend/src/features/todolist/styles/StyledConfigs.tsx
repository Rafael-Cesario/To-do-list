import styled from 'styled-components';
import { colors } from '../../../styles/palette';

export const StyledConfigs = styled.div`
  button {
    outline: none;
    border: none;
    padding: 5px 20px;
    font-weight: bold;
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
    position: absolute;
    top: 50vh;
    left: 50vw;
    transform: translate(-50%, -50%);

    background-color: ${colors.backgroundBlack};
    border-radius: 2px;
    overflow: hidden;

    .tab {
      background-color: ${colors.backgroundBlue};
      display: flex;
      justify-content: flex-end;

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
  }
`;
