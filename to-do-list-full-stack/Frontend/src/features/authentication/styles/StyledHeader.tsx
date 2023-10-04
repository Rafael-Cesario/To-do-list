import styled from 'styled-components';
import { TypeThemeProps } from '../../../styles/themes';

type Theme = { theme: TypeThemeProps };

export const StyledHeader = styled.header`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin: 2rem;

  button {
    padding: 0.3rem 1rem;
    cursor: pointer;
    outline: none;
    font-weight: bold;
    transition: 0.2s;
    border-radius: 3px;
    margin: 0 0.2rem;

    color: ${(props: Theme) => props.theme.textPrimary};
    background-color: ${(props: Theme) => props.theme.primary};
    border: 2px solid transparent;
    box-shadow: 5px 5px 2px #10101010;

    :hover {
      color: ${(props: Theme) => props.theme.textContainer};
      background-color: ${(p: Theme) => p.theme.container};
    }

    :active {
      transform: scale(0.95);
    }
  }

  .active {
    background-color: ${(p: Theme) => p.theme.container};
    color: ${(props: Theme) => props.theme.textContainer};
  }
`;
