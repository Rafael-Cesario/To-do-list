import styled from 'styled-components';
import { TypeThemeProps } from '../../../styles/themes';

type Theme = { theme: TypeThemeProps };

export const StyledLists = styled.div`
  margin: 5rem 0;
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .lists {
    display: flex;
    flex-wrap: wrap;
    width: 90vw;
  }

  .list {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0.5rem;
    padding: 5px 20px;
    height: 3rem;
    width: 20rem;

    border-radius: 2px;
    border: 2px solid ${(p: Theme) => p.theme.gray};
    background-color: ${(p: Theme) => p.theme.container};
    color: #fff;

    text-transform: capitalize;
    text-decoration: none;
    text-align: center;

    :hover {
      background-color: ${(p: Theme) => p.theme.primary};
    }
  }
`;
