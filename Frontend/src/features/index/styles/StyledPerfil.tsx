import styled from 'styled-components';
import { Theme } from '../../../styles/themes';

export const StyledPerfil = styled.div`
  .perfil-button {
    border: none;
    outline: none;
    font-weight: bold;
    padding: 5px 20px;
    background-color: ${(p: Theme) => p.theme.container};
    color: ${(p: Theme) => p.theme.textContainer};
    cursor: pointer;

    :hover {
      background-color: ${(p: Theme) => p.theme.primary};
      color: ${(p: Theme) => p.theme.textPrimary};
    }
  }

  .container {
    position: absolute;
    top: 50vh;
    left: 50vw;
    transform: translate(-50%, -50%);
    background-color: ${(p: Theme) => p.theme.container};
    width: 90vw;
    min-height: 80vh;
  }

  .content {
    display: grid;
    grid-template-columns: auto 1fr;
    min-height: 80vh;
  }
`;
