import styled from 'styled-components';
import { Theme } from '../../../styles/themes';

export const StyledTheme = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;

  .faded {
    margin: 5px 10px;
    color: ${(p: Theme) => p.theme.fadedContainer};
  }

  .themes {
    margin: 1rem;

    button {
      margin: 0.2rem;
      padding: 5px 10px;
      border: none;
      outline: none;
      cursor: pointer;
      font-weight: bold;
      background-color: ${(p: Theme) => p.theme.gray};
      color: ${(p: Theme) => p.theme.fadedContainer};

      :hover {
        color: ${(p: Theme) => p.theme.textContainer};
      }
    }
  }
`;
