import styled from 'styled-components';
import { colors } from '../../../styles/themes';

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
    flex-grow: 1;

    border-radius: 2px;
    background-color: ${colors.backgroundBlack};
    color: #fff;

    text-transform: capitalize;
    text-decoration: none;
    text-align: center;

    :hover {
      background-color: ${colors.backgroundBlue};
    }
  }
`;
