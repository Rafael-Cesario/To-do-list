import styled from 'styled-components';
import { TypeThemeProps } from '../../../styles/themes';

type Theme = { theme: TypeThemeProps };

export const StyledTitle = styled.main`
  display: flex;
  align-items: center;

  position: absolute;
  top: 45vh;
  left: 50vw;
  transform: translate(-50%, -50%);
  z-index: -1;

  .title {
    p {
      color: ${(props: Theme) => props.theme.faded};
      font-weight: bold;
      font-size: 0.8rem;
      margin-top: 0.5rem;
    }
  }
`;
