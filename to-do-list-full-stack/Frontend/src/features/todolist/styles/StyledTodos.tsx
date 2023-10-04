import styled from 'styled-components';
import { Theme } from '../../../styles/themes';

export const StyledTodos = styled.div`
  margin: 2rem;
  margin-top: 5rem;
  width: 90vw;
  max-width: 1000px;
  align-self: center;

  .todos {
    background-color: ${(p: Theme) => p.theme.container};
    padding: 2rem;
    position: relative;

    .todo {
      overflow: hidden;
      display: flex;
      align-items: center;
      margin-bottom: 1rem;

      padding: 5px 10px;
      transition: 0.1s;
      border-bottom: 2px solid ${(p: Theme) => p.theme.gray};

      :hover {
        background-color: ${(p: Theme) => p.theme.gray};
      }

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
        color: ${(p: Theme) => p.theme.textContainer};
        text-align: start;
        cursor: pointer;

        ::first-letter {
          text-transform: capitalize;
        }
      }
    }

    .next {
      .status {
        background-color: #555;
      }
    }

    .current .status {
      background-color: ${(p: Theme) => p.theme.primary};
    }

    .done .status {
      background-color: ${(p: Theme) => p.theme.textSuccess};
    }
  }
`;
