import styled from 'styled-components';
import { colors } from '../../../styles/palette';

export const StyledTodos = styled.div`
  margin: 2rem;
  margin-top: 5rem;
  width: 90vw;
  max-width: 1000px;
  align-self: center;

  .todos {
    background-color: ${colors.backgroundBlack};
    padding: 2rem;
    position: relative;

    .todo {
      overflow: hidden;
      display: flex;
      align-items: center;
      margin-bottom: 0.5rem;

      .status {
        outline: none;
        border: none;
        width: 15px;
        height: 15px;
        margin-right: 0.5rem;
        cursor: pointer;
      }

      .task {
        width: 90%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        border: none;
        outline: none;
        background-color: transparent;
        color: #ddd;
        text-align: start;
        cursor: pointer;

        ::first-letter {
          text-transform: capitalize;
        }
      }
    }

    .next {
      .status {
        background-color: #222;
      }

      .task {
        color: #aaa;
      }
    }

    .current .status {
      background-color: ${colors.backgroundBlue};
    }

    .done .status {
      background-color: #209040;
    }
  }
`;
