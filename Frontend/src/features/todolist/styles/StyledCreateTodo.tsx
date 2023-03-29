import { colors } from '../../../styles/themes';
import styled from 'styled-components';

export const StyledCreateTodo = styled.div`
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
`;
