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
    justify-content: center;
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
    box-shadow: 5px 5px 2px #10101010;
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
