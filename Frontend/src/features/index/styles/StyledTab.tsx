import styled from 'styled-components';
import { Theme } from '../../../styles/themes';

export const StyledTab = styled.div`
  width: 100%;
  background-color: ${(p: Theme) => p.theme.primary};
  display: flex;
  justify-content: space-between;
  align-items: center;

  .title {
    font-size: 1rem;
    margin: 5px 20px;
  }

  .perfil-close {
    border: none;
    outline: none;
    margin: 0;
    padding: 5px 20px;
    background-color: transparent;
    color: ${(p: Theme) => p.theme.textPrimary};
    border-radius: 0;

    :hover {
      background-color: ${(p: Theme) => p.theme.textError};
      color: ${(p: Theme) => p.theme.textPrimary};
    }
  }
`;
