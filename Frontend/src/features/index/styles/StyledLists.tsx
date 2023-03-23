import styled from 'styled-components';
import { colors } from '../../../styles/palette';

export const StyledLists = styled.div`
  grid-column: 4;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1rem;
  min-height: 95vh;
  border-radius: 3px;
  background-color: ${colors.backgroundBlack};

  .title {
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }

  .list {
    text-decoration: none;
    color: #fff;
    margin-bottom: 1rem;
    padding: 5px 20px;
    background-color: ${colors.backgroundBlue};
    border-radius: 3px;
    width: 100%;
    max-width: 400px;

    :hover {
      background-color: #202020;
    }
  }
`;
