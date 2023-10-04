import styled from 'styled-components';
import { Theme } from '../../../styles/themes';

export const StyledSide = styled.div`
  background-color: ${(p: Theme) => p.theme.gray};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1rem;

  button {
    border: none;
    outline: none;
    margin: 0;
    background-color: transparent;
    padding: 10px 20px;
    width: 100%;
    font-weight: bold;
  }

  .logout {
    color: ${(p: Theme) => p.theme.textError};

    :hover {
      background-color: ${(p: Theme) => p.theme.textError};
      color: ${(p: Theme) => p.theme.textPrimary};
    }
  }

  .options {
    display: flex;
    flex-direction: column;

    button {
      color: ${(p: Theme) => p.theme.fadedContainer};
      margin: 5px 0;

      :hover {
        color: ${(p: Theme) => p.theme.textContainer};
        background-color: ${(p: Theme) => p.theme.primary};
      }
    }

    .active {
      color: ${(p: Theme) => p.theme.textContainer};
      background-color: ${(p: Theme) => p.theme.primary};
    }
  }
`;
