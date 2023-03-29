import styled from 'styled-components';
import { TypeThemeProps } from '../../../styles/themes';

export const StyledLoading = styled.div`
  position: absolute;
  margin-bottom: 5rem;
  font-weight: bold;
  font-size: 1.5rem;
  bottom: 0;

  .loading::after {
    content: '';
    background-color: ${(props: { theme: TypeThemeProps }) => props.theme.container};
    width: 5rem;
    height: 2rem;
    position: absolute;
    top: 0;
    left: 0;
    animation: loading 2s infinite;

    @keyframes loading {
      from {
        transform: translate(0, 0);
      }

      to {
        transform: translate(5rem, 0);
      }
    }
  }
`;
