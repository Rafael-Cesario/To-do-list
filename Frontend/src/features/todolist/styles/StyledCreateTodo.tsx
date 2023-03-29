import { Theme } from '../../../styles/themes';
import styled from 'styled-components';

export const StyledCreateTodo = styled.div`
  margin-bottom: 5rem;
  display: flex;

  .input-todo {
    outline: none;
    border: none;
    background-color: ${(p: Theme) => p.theme.container};
    color: ${(p: Theme) => p.theme.textContainer};
    width: 80%;
    margin-right: 1rem;
    padding: 5px 20px;

    ::placeholder {
      color: ${(p: Theme) => p.theme.fadedContainer};
    }
  }

  .submit-todo {
    width: 20%;
    background-color: ${(p: Theme) => p.theme.primary};
    color: ${(p: Theme) => p.theme.textPrimary};
    outline: none;
    border: none;
    border-radius: 2px;
    font-weight: bold;
    cursor: pointer;

    :hover {
      background-color: ${(p: Theme) => p.theme.container};
      color: ${(p: Theme) => p.theme.textContainer};
    }
  }
`;
