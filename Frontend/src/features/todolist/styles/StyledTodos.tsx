import styled from 'styled-components';
import { colors } from '../../../styles/palette';

export const StyledTodos = styled.div`
  margin-top: 5rem;
  grid-column: 1 / span 2;

  .create-todo {
    margin-bottom: 5rem;
    display: flex;

    .input-todo {
      outline: none;
      border: none;
      background-color: ${colors.backgroundBlack};
      color: #ddd;
      width: 80%;
      margin-right: 1rem;
      padding: 5px 20px;

      ::placeholder {
        color: #aaa;
      }
    }

    .submit-todo {
      width: 20%;
      background-color: ${colors.backgroundBlue};
      outline: none;
      border: none;
      border-radius: 3px;
      color: #ddd;
      font-weight: bold;
      cursor: pointer;

      :hover {
        background-color: #ddd;
        color: #111;
      }
    }
  }

  .todos {
    background-color: ${colors.backgroundBlack};
    padding: 2rem;

    .todo {
      overflow: hidden;
      display: flex;
      align-items: center;
      margin-bottom: 0.5rem;

      .status {
        outline: none;
        border: none;
        background-color: white;
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
