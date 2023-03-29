import styled from 'styled-components';
import { Theme } from '../../../styles/themes';

export const StyledTags = styled.div`
  margin: 3rem 0;

  .tag {
    background-color: ${(p: Theme) => p.theme.gray};
    margin: 10px 10px 0 0;
    flex-grow: 1;
    border-radius: 3px;
    font-size: 0.9rem;
    text-transform: capitalize;
    padding: 5px 10px;
    display: flex;
    justify-content: space-between;

    .remove-tag {
      width: fit-content;
      margin-left: 0.5rem;

      :hover {
        color: ${(p: Theme) => p.theme.textError};
      }
    }
  }

  .new-tag {
    outline: none;
    border: none;
    color: ${(p: Theme) => p.theme.color};
    font-weight: bold;
    background-color: ${(p: Theme) => p.theme.gray};
    padding: 5px 10px;
    margin: 10px 10px 0 0;
    border-radius: 3px;
  }
`;
